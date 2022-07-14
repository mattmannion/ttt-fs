import cors from 'cors';
import { cfg } from 'src/util/env';

export const mw_cors = cors({
  optionsSuccessStatus: 200,
  origin: (origin, fn) => {
    if (cfg.cors.whitelist.has(origin!)) return fn(null, origin);
    else return fn(<any>'Not Allowed By CORS', origin);
  },
  credentials: true,
});
