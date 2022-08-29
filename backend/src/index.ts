import 'reflect-metadata';
import 'module-alias/register';
import { TypeOrmPGInit } from 'src/db/to';
import { server } from 'src/socket/io';
import { cfg } from 'src/util/env';

console.log('live');
(async () => {
  try {
    await TypeOrmPGInit();

    console.log('redis connected');

    server.listen(cfg.server.port, () =>
      console.log('live @ ' + cfg.server.path + cfg.server.port)
    );
  } catch (error) {
    console.log((<Error>error).message);
  }
})();
