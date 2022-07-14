// this file will only be used for main server

import express, { json } from 'express';
import { mw_cors } from 'src/middleware/cors';
import { ep_log } from 'src/middleware/logger';
import { express_session } from 'src/middleware/redis.session';
import { cfg, prod } from 'src/util/env';

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
<<<<<<< HEAD
=======
export { app };
>>>>>>> 9336c9fe56be68f5c98719939e1f35e1658e0627
