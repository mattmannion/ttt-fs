import { Request, Response } from 'express';
import { dbq } from 'src/db/db';
import { login_query } from 'src/db/sql/authentication.sql';

export async function PostLogin(req: Request, res: Response) {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;

    const data = await dbq(login_query, [username, password], 0);

    if (data) {
      req.session.username = data.username;

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
