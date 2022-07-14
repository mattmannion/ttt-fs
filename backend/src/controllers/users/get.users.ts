import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { dbq } from 'src/db/db';
import { get_users_query } from 'src/db/sql/users.sql';

export async function GetUsers(_req: Request, res: Response) {
  const users = await dbq<UsersModel[]>({
    query_string: get_users_query,
    query_rows: 'all',
  });

  res.status(200).json({
    users,
    status: 'success',
  });
}
