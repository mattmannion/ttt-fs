import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { models } from 'src/db/models';
import { db_co, prod } from 'src/util/env';
import { dbq } from 'src/db/db';
import {
  util_drop_users_query,
  util_insert_users_query,
} from 'src/db/sql/util.sql';

/**
 * TypeOrmPGInit will run at server boot.
 * 'init' arg will toggle DS.initialize();
 * this toggle allows for this init func
 * to be used in testing without trying
 * to restablish a new connection to
 * the postgres database - preventing error.
 */
export async function TypeOrmPGInit() {
  const DS = new DataSource({
    ...db_co,
    entities: await models,
  });

  await DS.initialize();
  await DS.synchronize();

  // exits init preserving existing data
  if (prod) return;

  /**
   * WARNING - ALL CODE BELOW RUNS IN DEVELOPMENT
   * all data in the tables dropped below will be lost
   */

  // drops and seeds tables as needed for repeatable testing
  await dbq({ query: util_drop_users_query });

  // recreates dropped tables
  await DS.synchronize();

  // inserts data
  await dbq({ query: util_insert_users_query });

  console.log('db connected');
  console.log('db seeded');
  return;
}
