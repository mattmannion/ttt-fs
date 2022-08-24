import type { Client } from 'connect-redis';
import { createClient } from 'redis';
import { RedisStore } from 'src/api/middleware/redis.session';
import { cfg } from 'src/util/env';

export const redis = createClient({
  legacyMode: true,
  url: cfg.redis.url,
});

const client = (<unknown>redis) as Client;

export const store = new RedisStore({ client });
