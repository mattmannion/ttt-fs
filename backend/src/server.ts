import cors from 'cors';
import express, { json } from 'express';
import { ep_log } from 'src/middleware/logger';
import { express_session } from 'src/middleware/redis.session';
import { prod } from 'src/util/env';

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

export { app };
