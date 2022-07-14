import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { InternalError } from 'src/util/util';
import { dbq } from 'src/db/db';
import { get_user_query } from 'src/db/sql/users.sql';

export async function GetUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await dbq<UsersModel>({
      query_string: get_user_query,
      query_params: [id],
    });

    res.status(200).json({
      user,
      status: 'success',
    });
  } catch (error) {
    const { code, json } = InternalError(error);
    res.status(code).json(json);
  }
}
