import { config } from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

config();

const { env } = process;

/** sets application variables into prod or dev */
export const prod = env.NODE_ENV === 'prod' ? true : false;

/** configures certain features to work in testing or not  */
export const env_test = env.NODE_ENV === 'test';

export const cfg = {
  rootdir: __dirname + '/..',
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
    whitelist: [env.WL_1!, env.WL_2!, undefined],
  },
  jest: {
    sleep: 2000,
  },
  ep: {
    users: '/users',
    login: '/login',
    profile: '/profile',
  },
  bcrypt: {
    salt: 12,
    test: 1,
  },
};

export const db_co: PostgresConnectionOptions = {
  type: env.TYPEORM_CONNECTION! as 'postgres',
  host: env.TYPEORM_HOST!,
  port: +env.TYPEORM_PORT!,
  database: env.TYPEORM_DATABASE!,
  username: env.TYPEORM_USERNAME!,
  password: env.TYPEORM_PASSWORD!,
  entities: [],
  logging: Boolean(env.TYPEORM_LOGGING!),
};
