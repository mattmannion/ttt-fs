import cors from 'cors';
import { cfg } from 'src/util/env';

// below is the original error I was sending
const error: Error = <any>'Not Allowed By CORS';

// const error: Error = <any>Error();

export const mw_cors = cors({
  optionsSuccessStatus: 200,
  origin: function (origin, callback) {
    if (cfg.cors.whitelist.has(origin!)) return callback(null, origin);
    else return callback(error, origin);
  },
  credentials: true,
});
