import { Request, Response } from 'express';
import { dbq } from 'src/db/psql.db';
import { get_user_query } from 'src/db/sql/user.sql';

interface GetUserResponse {
  id: number;
  firstname: string;
  lastname?: string;
  email?: string;
  username?: string;
  password?: string;
}

export async function GetUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = (await dbq(get_user_query, [id], 0)) as GetUserResponse[];

    res.status(200).json({
      user,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
}
