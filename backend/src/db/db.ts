import { Pool } from 'pg';

const db = new Pool({ idleTimeoutMillis: 100 });

interface DatabaseQuery {
  query_string: string;
  query_params?: string[];
  query_rows?: 'all' | 'one';
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
  query_string,
  query_params,
  query_rows,
}: DatabaseQuery): Promise<T> {
  if (!query_params) query_params = [];
  if (!query_rows) query_rows = 'all';
  return (await db
    .query(query_string, query_params)
    .then(({ rows }) => (query_rows === 'all' ? rows : rows[0]))) as T;
}
