import 'reflect-metadata';
import 'module-alias/register';
import { cfg, prod } from 'src/util/env';
import express, { json } from 'express';
import { express_session } from 'src/middleware/redis.session';
import { redis } from 'src/db/redis';
import { mw_cors } from 'src/middleware/cors';
import { ep_log } from 'src/middleware/logger';
import { router } from 'src/routes/router';
import { TypeOrmInit } from 'src/db/typeorm';

// this file will only be used for main server
// configuration, including initial middleware.
export const app = express();

// if behind a proxy like nginx
app.set('trust proxy', prod);

// redis session
app.use(express_session);

// server config
app.disable('x-powered-by');
app.options('*', mw_cors(cfg.cors.whitelist));
app.use(mw_cors(cfg.cors.whitelist));

app.use(json());

app.use(ep_log);

(async () => {
  try {
    await TypeOrmInit();
    await redis.connect().then(() => console.log('redis connected'));

    // server router
    app.use(...(await router));

    app.listen(cfg.server.port, () =>
      console.log('live @ ' + cfg.server.path + cfg.server.port)
    );
  } catch (error) {
    console.log((<Error>error).message);
  }
})();
