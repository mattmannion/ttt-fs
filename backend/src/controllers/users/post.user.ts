import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { dbq } from 'src/db/db';
import {
  check_username_or_email_query,
  post_user_query,
} from 'src/db/sql/users.sql';
import bc from 'bcryptjs';
import { cfg } from 'src/util/env';

export async function PostUser({ body }: Request, res: Response) {
  let { firstname, lastname, email, username, password } = body;

  // end request if body values are empty/null
  if (!firstname || !lastname || !email || !username || !password) {
    res.status(400).json({
      msg: 'All fields must have values...',
    });
    return;
  }

  const user_check = await dbq<UsersModel>({
    query: check_username_or_email_query,
    params: [username, email],
  });

  if (user_check) {
    res.status(403).json({
      msg: 'Username or Email already exists...',
    });
    return;
  }

  const hashed_password = await bc.hash(password, cfg.bcrypt.salt);

  const user = await dbq<UsersModel>({
    query: post_user_query,
    params: [firstname, lastname, email, username, hashed_password],
  });

  res.status(200).json({
    user,
    status: 'success',
  });
}
