import type { Request, Response } from 'express';
import type { Users } from 'src/models/Users';
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

    const user_check = await dbq<Users>({
      query_string: check_username_or_email_query,
      query_params: [username, email],
      query_rows: 'one',
    });

    if (user_check) {
      res.status(400).json({
        msg: 'Username or Email already exists...',
      });
      return;
    }

    const user = await dbq<Users>({
      query_string: post_user_query,
      query_params: [firstname, lastname, email, username, password],
      query_rows: 'one',
    });

    res.status(200).json({
      user,
      status: 'success',
    });
  } catch (error) {
    InternalError(error, res.status);
  }
}