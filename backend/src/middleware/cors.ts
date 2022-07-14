import cors from 'cors';

// below is the original error I was sending
const error: Error = <any>'Not Allowed By CORS';

// const error: Error = <any>Error();

export const mw_cors = (wl: Set<string | undefined | null>) =>
  cors({
    optionsSuccessStatus: 200,
    origin: (origin, fn) => {
      if (wl.has(origin!)) return fn(null, origin);
      else return fn(error, origin);
    },
    credentials: true,
  });
