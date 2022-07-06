import cors from 'cors';
import { whitelist } from 'src/env';

// below is the original error I was sending
const error: Error = <any>'Not Allowed By CORS';

// const error: Error = <any>Error();

export default cors({
  optionsSuccessStatus: 200,
  origin: function (origin, callback) {
    if (whitelist.has(origin!)) return callback(null, origin);
    else return callback(error, origin);
  },
  credentials: true,
});
