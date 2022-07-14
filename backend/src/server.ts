// this file will only be used for main server

import express, { json } from 'express';
import { mw_cors } from 'src/middleware/cors';
import { express_session } from 'src/middleware/redis.session';
import { router } from 'src/routes/router';
import { cfg, prod } from 'src/util/env';

// configuration, including initial middleware.
const app = express();

// if behind a proxy like nginx
app.set('trust proxy', prod);

// redis session
app.use(express_session);

// server config
app.disable('x-powered-by');
app.options('*', mw_cors(cfg.cors.whitelist));
app.use(mw_cors(cfg.cors.whitelist));

app.use(json());

(async () => {
  try {
    app.use(...(await router));
  } catch (error) {
    console.log((<Error>error).message);
  }
})();

export { app };
