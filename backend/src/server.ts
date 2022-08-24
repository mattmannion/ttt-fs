import 'reflect-metadata';
import express, { json } from 'express';
import { mw_cors } from 'src/api/middleware/cors';
import { express_session } from 'src/api/middleware/redis.session';
import { router } from 'src/api/routes/router';
import { env_test, prod } from 'src/util/env';
import { redis } from 'src/db/redis';
import { ep_log } from 'src/api/middleware/logger';

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

app.use((req, res, next) => ep_log(req, res, next, !(prod || env_test)));

(async () => {
  app.use(...(await router));

  await redis.connect();
})();

export { app };
