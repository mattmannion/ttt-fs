import 'reflect-metadata';
import 'module-alias/register';
require('dotenv').config();
import { json } from 'express';
import { app } from 'src/server';
import cors from 'src/middleware/cors';
import { express_session } from 'src/middleware/redis.session';
import { router } from 'src/routes/router';
import TypeOrmInit from 'src/db/typeorm';
import { ep_log } from 'src/middleware/logger';
import { redis } from 'src/db/redis';
import { cfg, prod } from 'src/env';

// this app will only be used for main server
// configuration, including initial middleware.

// if behind a proxy like nginx
app.set('trust proxy', prod);

// redis session
app.use(express_session);

// server config
app.disable('x-powered-by');
app.options('*', cors);
app.use(cors);

app.use(json());

app.use(ep_log);

// server router
(async function () {
  try {
    app.use(...(await router()));

    await TypeOrmInit();
    await redis.connect().then(() => console.log('redis connected'));

    app.listen(cfg.server.port, () =>
      console.log('live @ ' + cfg.server.path + cfg.server.port)
    );
  } catch (error) {
    console.log((<Error>error).message);
  }
})();
