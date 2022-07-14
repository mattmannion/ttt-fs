import 'reflect-metadata';
import { db_co } from 'src/util/env';
import { models } from 'src/db/models';
import { DataSource } from 'typeorm';

export async function TypeOrmInit() {
  try {
    const DS = new DataSource({
      ...db_co,
      entities: await models,
    });

    await DS.initialize();
    await DS.synchronize();

    console.log('db connected');
  } catch (error) {
    console.log((<Error>error).message);
  }
}
