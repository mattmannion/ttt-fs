import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { InternalError } from 'src/util/util';
import { dbq } from 'src/db/db';
import { get_users_query } from 'src/db/sql/users.sql';

export async function GetUsers(_req: Request, res: Response) {
  try {
    const users = await dbq<UsersModel[]>({
      query_string: get_users_query,
      query_rows: 'all',
    });

    res.status(200).json({
      users,
      status: 'success',
    });
  } catch (error) {
    const { code, json } = InternalError(error);
    res.status(code).json(json);
  }
}
