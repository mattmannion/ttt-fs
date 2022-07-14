import 'reflect-metadata';
import 'module-alias/register';
import { cfg } from 'src/util/env';
import { app } from 'src/server';
import { TypeOrmInit } from 'src/db/to';
import { redis } from 'src/db/redis';
import { ep_log } from 'src/middleware/logger';

(async () => {
  try {
    app.use(ep_log);

    await TypeOrmInit();
    await redis.connect().then(() => console.log('redis connected'));
    app.listen(cfg.server.port, () =>
      console.log('live @ ' + cfg.server.path + cfg.server.port)
    );
  } catch (error) {
    console.log((<Error>error).message);
  }
})();
