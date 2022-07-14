import 'reflect-metadata';
import 'module-alias/register';
require('dotenv').config();
import { cfg } from 'src/util/env';
import { router } from 'src/routes/router';
import TypeOrmInit from 'src/db/typeorm';
import { redis } from 'src/db/redis';
import { app } from 'src/server';
// server router
(async function () {
  try {
    app.use(...(await router()));

    await TypeOrmInit();
    await redis.connect().then(() => console.log('redis connected'));

    app.listen(cfg.server.port, () =>
      console.log('live @ ' + cfg.server.path + cfg.server.port)
    );
  } catch (error) {
    if (error instanceof Error) return console.log(error.message);
    return console.log('Unknown Error');
  }
})();
