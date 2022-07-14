import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { InternalError } from 'src/util/util';
import { dbq } from 'src/db/db';
import {
  check_username_or_email_query,
  post_user_query,
} from 'src/db/sql/users.sql';

export async function PostUser({ body }: Request, res: Response) {
  try {
    // todo check for existing username

    let { firstname, lastname, email, username, password } = body;

    // end request if body values are empty/null
    if (!firstname || !lastname || !email || !username || !password) {
      res.status(400).json({
        msg: 'All fields must have values...',
      });
      return;
    }

    const user_check = await dbq<UsersModel>({
      query_string: check_username_or_email_query,
      query_params: [username, email],
    });

    if (user_check) {
      res.status(400).json({
        msg: 'Username or Email already exists...',
      });
      return;
    }

    const user = await dbq<UsersModel>({
      query_string: post_user_query,
      query_params: [firstname, lastname, email, username, password],
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
