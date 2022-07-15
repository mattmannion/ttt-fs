import type { SQLStatement } from 'sql-template-strings';
import { Pool } from 'pg';
import { db_co } from 'src/util/env';

const db = new Pool({
  idleTimeoutMillis: 100,
  password: db_co.password,
  user: db_co.username,
  database: db_co.database,
  port: db_co.port,
});

interface DatabaseQuery {
  query: SQLStatement;
  params?: string[];
  rows?: 'one' | 'all';
}

/**
 * dbq retrieves data from the postgres database via a SQL query string.
 * The data returned can be formatted in three ways using
 * the 'query_rows' property.
 *
 * 'query_rows' accepts two options:
 * - 'all' returns all the rows in an array.
 * - 'one' returns the first row only.
 *
 * This funtion is generic.
 * Please pass it a model, interace, or type.
 *
 * returns Promise of type T
 *
 * Please note:
 * Ommitted argument properties' defaults are
 * 'all' for 'query_rows' and [ ] for 'query_params'.
 *
 * 'query_string' is required.
 */
export async function dbq<T>({
  query: query_string,
  params: params,
  rows: rows,
}: DatabaseQuery): Promise<T> {
  if (!params) params = [];
  if (!rows) rows = 'one';
  return (await db
    .query(query_string, params)
    .then(({ rows: qrows }) => (rows === 'all' ? qrows : qrows[0]))) as T;
}
