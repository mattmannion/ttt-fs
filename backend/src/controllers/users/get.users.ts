import { Request, Response } from 'express';
import { dbq } from 'src/db/db';
import { get_users_query } from 'src/db/sql/users.sql';
import type { Users } from 'src/models/Users';

export async function GetUsers(_req: Request, res: Response) {
  try {
    const users = await dbq<Users[]>({ query_string: get_users_query });

    res.status(200).json({
      users,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
}
