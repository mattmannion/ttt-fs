import connectRedis from 'connect-redis';
import session from 'express-session';
import { client } from 'src/db/redis';
import { cfg, prod } from 'src/util/env';

const RedisStore = connectRedis(session);

export const express_session = session({
  store: new RedisStore({ client }),
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
