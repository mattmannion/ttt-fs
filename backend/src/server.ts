// this file will only be used for main server

import express, { json } from 'express';
import { mw_cors } from 'src/middleware/cors';
import { express_session } from 'src/middleware/redis.session';
import { router } from 'src/routes/router';
import { prod } from 'src/util/env';

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

(async () => app.use(...(await router)))();

export { app };
