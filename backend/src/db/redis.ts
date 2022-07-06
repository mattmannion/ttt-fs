import type { Client } from 'connect-redis';
import { createClient } from 'redis';
import { cfg } from 'src/env';

export const redis = createClient({
  legacyMode: true,
  url: cfg.redis.url,
});

export const client = (<unknown>redis) as Client;
