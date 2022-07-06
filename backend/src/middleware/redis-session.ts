import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import {
  redis,
  // prod
} from 'src/env';

const RedisStore = connectRedis(session);

const redisClient = createClient({
  host: redis.host,
  port: redis.port,
  password: redis.password,
});

export default session({
  store: new RedisStore({ client: redisClient }),
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: redis.session.age,
  },
  name: redis.session.name,
  secret: redis.session.secret,
  saveUninitialized: false,
  resave: false,
});
