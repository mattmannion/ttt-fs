import express, { json } from 'express';
import { mw_cors } from 'src/middleware/cors.js';
import { ep_log } from 'src/middleware/logger';
import { express_session } from 'src/middleware/redis.session.js';
import { prod } from 'src/util/env.js';

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

app.use(ep_log);

export { app };
