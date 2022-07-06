import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
const { env } = process;

export const prod: boolean = env.NODE_ENV === 'prod' ? true : false;

console.log(prod ? 'prod' : 'dev');

export const cfg = {
  rootdir: __dirname,
  server: {
    port: env.PORT ? +env.PORT : 7890,
    path: prod ? env.LOCATION! : 'http://localhost:',
  },
  redis: {
    host: prod ? env.REDIS_HOST! : 'localhost',
    port: prod ? +env.REDIS_PORT! : 6379,
    password: prod ? env.REDIS_PW! : undefined,
    get url(): string {
      return `redis://${this.host}:${this.port}`;
    },
  },
  session: {
    name: env.SESSION_NAME!,
    age: Number(env.SESSION_AGE!),
    secret: env.SESSION_SECRET!,
  },
  cors: {
    prodlist: new Set([env.WL_1!, env.WL_2!]),
    devlist: new Set([
      'http://localhost:3000',
      'http://localhost:7890',
      undefined,
    ]),
    whitelist() {
      return prod ? this.prodlist : this.devlist;
    },
  },
};

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
