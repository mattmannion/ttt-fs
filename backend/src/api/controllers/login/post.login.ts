import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { dbq } from 'src/db/db';
import { login_query } from 'src/db/sql/authentication.sql';
import bc from 'bcryptjs';

export async function PostLogin({ body, session }: Request, res: Response) {
  const { username, password } = body;

  if (!username || !password) {
    res.status(400).json({
      msg: 'All fields must have values...',
    });
    return;
  }

  // console.log(username);
  const user = await dbq<UsersModel>({
    query: login_query,
    params: [username],
  });

  if (!user) {
    res.status(206).json({
      message: 'Wrong Username or Password',
      status: 'failure',
    });
    return;
  }

  const auth = await bc.compare(password, user.password);

  if (!auth) {
    res.status(206).json({
      message: 'Wrong Username or Password',
      status: 'failure',
    });
    return;
  }

  session.username = user.username;
  // session.sid = 'sess:' + session.id;
  session.sid = session.id;

  res.status(200).json({
    username,
    message: 'you have logged in',
    status: 'success',
  });
}
