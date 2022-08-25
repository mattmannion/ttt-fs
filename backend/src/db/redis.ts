import type { Client } from 'connect-redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import { cfg } from 'src/util/env';

export const redis = createClient({
  legacyMode: true,
  url: cfg.redis.url,
});

export const client = (<unknown>redis) as Client;

// Creates new store for us to access on the fly
const rs = connectRedis(session);
export const session_store = new rs({ client });
