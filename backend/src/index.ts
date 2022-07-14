import 'reflect-metadata';
import 'module-alias/register';
require('dotenv').config();
import { cfg, prod } from 'src/util/env';
import { router } from 'src/routes/router';
import TypeOrmInit from 'src/db/typeorm';
import { redis } from 'src/db/redis';
import { json } from 'express';
import { ep_log } from 'src/middleware/logger';
import { express_session } from 'src/middleware/redis.session';
import cors from 'src/middleware/cors';
import { app } from 'src/server';

// this file will only be used for main server
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
(async function () {
  try {
    // server router
    app.use(...(await router()));

    await TypeOrmInit();
    await redis.connect().then(() => console.log('redis connected'));

    app.listen(cfg.server.port, () =>
      console.log('live @ ' + cfg.server.path + cfg.server.port)
    );
  } catch (error) {
    if (error instanceof Error) return console.log(error.message);
    return console.log('Unknown Error');
  }
})();
