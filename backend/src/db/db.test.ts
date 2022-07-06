import { dbq } from 'src/db/db';
import {
  get_all_users_query,
  get_one_user_query,
} from 'src/db/sql/users.queries';
import type { Users } from 'src/models/Users';

describe('checks the return types from the database', function () {
  it('should return an array', async function () {
    const users = await dbq<Users[]>({ query_string: get_all_users_query });

    expect(users).toBeInstanceOf(Array);
  });

  it('should return an object', async function () {
    const user = await dbq<Users>({
      query_string: get_one_user_query,
      query_params: ['1'],
      query_rows: 'one',
    });

    expect(user).toBeInstanceOf(Object);
  });
});
