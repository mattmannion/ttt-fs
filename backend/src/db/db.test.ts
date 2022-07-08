import { dbq } from 'src/db/db';
import { get_user_query, get_users_query } from 'src/db/sql/users.sql';
import type { Users } from 'src/models/Users';

describe('checks the return types from the database', function () {
  it('should return an array', async function () {
    const users = await dbq<Users[]>({
      query_string: get_users_query,
      query_rows: 'all',
    });

    expect(users).toBeInstanceOf(Array);
  });

  it('should return an object', async function () {
    const user = await dbq<Users>({
      query_string: get_user_query,
      query_params: ['1'],
    });

    expect(user).toBeInstanceOf(Object);
  });
});
