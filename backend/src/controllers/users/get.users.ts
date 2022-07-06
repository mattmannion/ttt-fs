import { Request, Response } from 'express';
import { dbq } from 'src/db/psql.db';
import { get_users_query } from 'src/db/sql/users.sql';

interface GetUsersResponseIF {
  id: number;
  firstname: string;
  lastname?: string;
  email?: string;
  username?: string;
  password?: string;
}

export async function GetUsers(req: Request, res: Response) {
  try {
    const users = (await dbq(get_users_query, [], 1)) as GetUsersResponseIF[];

    res.status(200).json({
      users,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
}
