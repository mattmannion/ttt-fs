import cors from 'cors';
import { cfg } from 'src/util/env';

const wl = new Set(cfg.cors.whitelist);
console.log(wl);
export const mw_cors = cors({
  optionsSuccessStatus: 200,
  origin: (origin, fn) => {
    if (wl.has(origin!)) return fn(null, origin);
    else return fn(<any>'Not Allowed By CORS', origin);
  },
  credentials: true,
});
