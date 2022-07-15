import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { dbq } from 'src/db/db';
import { login_query } from 'src/db/sql/authentication.sql';

export async function PostLogin({ body, session }: Request, res: Response) {
  const { username, password } = body;

  if (!username || !password) {
    res.status(400).json({
      msg: 'All fields must have values...',
    });
    return;
  }

  const user = await dbq<UsersModel>({
    query_string: login_query,
    query_params: [username, password],
  });

  if (user) {
    session.username = user.username;

    res.status(200).json({
      username,
      password,
      message: 'you have logged in',
      status: 'success',
    });
  } else {
    res.status(202).json({
      message: 'incorrect username or password',
      status: 'success',
    });
  }
}
