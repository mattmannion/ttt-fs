import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
const env = process.env;
// env check
export const prod: boolean = env.NODE_ENV === 'prod' ? true : false;
console.log(prod ? 'prod' : 'dev');

// ports and paths
export const path: string = prod ? env.LOCATION! : 'http://localhost:';
export const port: number = prod ? +env.PORT! : 7890;

// redis
export const redis = {
  port: prod ? +env.REDIS_PORT! : 6379,
  host: prod ? env.REDIS_HOST! : 'localhost',
  password: prod ? env.REDIS_PW! : undefined,
  session: {
    name: env.SESSION_NAME!,
    age: +env.SESSION_AGE!,
    secret: env.SESSION_SECRET!,
  },
};

// db
export const pg: PostgresConnectionOptions = {
  host: prod ? env.TYPEORM_HOST! : 'localhost',
  database: prod ? env.TYPEORM_DATABASE! : 'ttt',
  username: prod ? env.TYPEORM_USERNAME! : 'postgres',
  password: prod ? env.TYPEORM_PASSWORD! : 'postgres',
  port: prod ? +env.TYPEORM_PORT! : 5432,
  type: prod ? (env.TYPEORM_CONNECTION! as 'postgres') : 'postgres',
  synchronize: prod
    ? env.TYPEORM_SYNCRONIZE! === 'true'
      ? true
      : false
    : true,
  logging: prod ? (env.TYPEORM_LOGGING! === 'true' ? true : false) : true,
};

// cors
const prodlist = new Set([env.WL_1!, env.WL_2!]);
const devlist = new Set([
  'http://localhost:3000',
  'http://localhost:7890',
  undefined,
]);
export const whitelist = prod ? prodlist : devlist;
