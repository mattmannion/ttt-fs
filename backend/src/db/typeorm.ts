import { DataSource } from 'typeorm';
import { pg } from 'src/util/env';
import { models } from 'src/db/models';

export async function TypeOrmInit() {
  try {
    const DS = new DataSource({
      ...pg,
      entities: await models,
    });

    await DS.initialize();
    await DS.synchronize();

    console.log('db connected');
  } catch (error) {
    console.log((<Error>error).message);
  }
}
