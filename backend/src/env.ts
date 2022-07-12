import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
const { env } = process;

export const prod = env.NODE_ENV === 'prod' ? true : false;

console.log(prod ? 'prod' : 'dev');

export const cfg = {
  rootdir: __dirname,
  server: {
    port: +env.PORT!,
    path: env.LOCATION!,
  },
  redis: {
    password: env.REDIS_PW!,
    url: `redis://${env.REDIS_HOST!}:${env.REDIS_PORT!}`,
  },
  session: {
    name: env.SESSION_NAME!,
    age: Number(env.SESSION_AGE!),
    secret: env.SESSION_SECRET!,
  },
  cors: {
    whitelist: new Set([env.WL_1!, env.WL_2!, undefined]),
  },
};

export const pg: PostgresConnectionOptions = {
  host: env.TYPEORM_HOST!,
  database: env.TYPEORM_DATABASE!,
  username: env.TYPEORM_USERNAME!,
  password: env.TYPEORM_PASSWORD!,
  port: +env.TYPEORM_PORT!,
  type: env.TYPEORM_CONNECTION! as 'postgres',
  synchronize: Boolean(env.TYPEORM_SYNCRONIZE!),
  logging: Boolean(env.TYPEORM_LOGGING!),
};
