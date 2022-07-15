import 'reflect-metadata';
import { models } from 'src/db/models';
import { DataSource } from 'typeorm';
import { db_co, prod } from 'src/util/env';
import { dbq } from 'src/db/db';
import {
  testing_drop_users_query,
  testing_insert_users_query,
} from 'src/db/sql/testing.sql';

/**
 * TypeOrmPGInit will run at server boot.
 * 'init' arg will toggle DS.initialize();
 * this toggle allows for this init func
 * to be used in testing without trying
 * to restablish a new connection to
 * the postgres database - preventing error.
 */
export async function TypeOrmPGInit(init: boolean) {
  const DS = new DataSource({
    ...db_co,
    entities: await models,
  });

  if (init) {
    await DS.initialize();
    await DS.synchronize();
  }

  // exits init preserving existing data
  if (prod) return;

  /**
   * WARNING - ALL CODE BELOW RUNS IN DEVELOPMENT
   * all data in the tables dropped below will be lost
   */

  // drops and seeds tables as needed for repeatable testing
  await dbq({ query: testing_drop_users_query });

  // recreates dropped tables
  await DS.synchronize();

  // inserts data
  await dbq({ query: testing_insert_users_query });

  if (init) console.log('db connected');
  console.log('db seeded');
  return;
}
