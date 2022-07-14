import { dbq } from 'src/db/db';
import { get_user_query, get_users_query } from 'src/db/sql/users.sql';
import type { UsersModel } from 'src/db/models/Users.model';

describe('checks the return types from the database', () => {
  it('should return an array', async () => {
    expect(
      await dbq<UsersModel[]>({
        query_string: get_users_query,
        query_rows: 'all',
      })
    ).toBeInstanceOf(Array);
  });

  it('should return an object', async () => {
    const user = await dbq<UsersModel>({
      query_string: get_user_query,
      query_params: ['1'],
    });

    expect(user).toBeInstanceOf(Object);
  });
});
