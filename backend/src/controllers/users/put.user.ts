import type { Request, Response } from 'express';
import type { Users } from 'src/models/Users';
import { dbq } from 'src/db/db';
import { get_user_query } from 'src/db/sql/users.sql';

export async function PutUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await dbq<Users>({
      query_string: get_user_query,
      query_params: [id],
      query_rows: 'one',
    });

    res.status(200).json({
      user,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
}
