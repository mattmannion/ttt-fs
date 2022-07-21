import 'reflect-metadata';
import express, { json } from 'express';
import { mw_cors } from 'src/middleware/cors';
import { express_session } from 'src/middleware/redis.session';
import { router } from 'src/routes/router';
import { env_test, prod } from 'src/util/env';
import { redis } from 'src/db/redis';
import { ep_log } from 'src/middleware/logger';

// this file will only be used for main server
// configuration, including initial middleware.
const app = express();

// if behind a proxy like nginx
app.set('trust proxy', prod);

// redis session
app.use(express_session);

// server config
app.disable('x-powered-by');
app.options('*', mw_cors);
app.use(mw_cors);

app.use(json());

if (!(prod || env_test)) app.use(ep_log);

(async () => {
  app.use(...(await router));

  await redis.connect();
})();

export { app };
