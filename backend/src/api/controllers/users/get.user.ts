import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { dbq } from 'src/db/db';
import { get_user_query } from 'src/db/sql/users.sql';

export async function GetUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await dbq<UsersModel>({
    query: get_user_query,
    params: [id],
  });

  if (!user)
    res.status(404).json({
      status: 'failure',
      msg: 'User not found...',
    });
  else
    res.status(200).json({
      user,
      status: 'success',
    });
}
