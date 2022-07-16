import 'reflect-metadata';
import 'module-alias/register';
import { cfg, prod } from 'src/util/env';
import { app } from 'src/server';
import { ep_log } from 'src/middleware/logger';
import { TypeOrmPGInit } from 'src/db/to';

(async () => {
  try {
    await TypeOrmPGInit();
    if (!prod) app.use(ep_log);
    console.log('redis connected');
    app.listen(cfg.server.port, () =>
      console.log('live @ ' + cfg.server.path + cfg.server.port)
    );
  } catch (error) {
    console.log((<Error>error).message);
  }
})();
