import 'reflect-metadata';
import 'module-alias/register';
require('dotenv').config();
import express, { json } from 'express';
import { cfg, prod } from 'src/env';
import cors from 'src/middleware/cors';
import { express_session } from 'src/middleware/redis.session';
import { router } from 'src/routes/router';
import TypeOrmInit from 'src/db/typeorm';
import { ep_log } from 'src/middleware/logger';
// this app will only be used for main server
// configuration, including initial middleware.
const app = express();

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

    app.listen(cfg.server.port, () =>
      console.log('live @ ' + cfg.server.path + cfg.server.port)
    );
  } catch (error) {
    if (error instanceof Error) return console.log(error.message);
    return console.log('Unknown Error');
  }
})();
