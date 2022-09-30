import connectRedis from 'connect-redis';
import session from 'express-session';
import { rdc } from 'src/db/redis';
import { cfg, prod } from 'src/util/env';

export const RedisStore = connectRedis(session);

export const rds = new RedisStore({ client: rdc });

export const express_session = session({
  store: rds,
  cookie: {
    secure: prod,
    httpOnly: prod,
    maxAge: cfg.session.age,
  },
  name: cfg.session.name,
  secret: cfg.session.secret,
  saveUninitialized: false,
  resave: false,
});
