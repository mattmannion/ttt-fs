import { Request, Response } from 'express';
import { dbq } from 'src/db/db';
import { login_query } from 'src/db/sql/authentication.sql';
import type { Users } from 'src/models/Users';

export async function PostLogin(req: Request, res: Response) {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;

    const user = await dbq<Users>({
      query_string: login_query,
      query_params: [username, password],
      query_rows: 'one',
    });

    if (user) {
      req.session.username = user.username;

      res.status(200).json({
        username,
        password: password ? true : false,
        message: 'you have logged in',
        status: 'success',
      });
    } else {
      res.status(202).json({
        message: 'incorrect username or password',
        status: 'success',
      });
    }
  } catch (error) {
    console.log(error);
  }
}
