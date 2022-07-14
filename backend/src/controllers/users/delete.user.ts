import type { Request, Response } from 'express';
import type { Users } from 'src/db/models/Users.model';
import { InternalError } from 'src/util/util';
import { dbq } from 'src/db/db';
import {
  check_username_and_email_query,
  delete_user_query,
} from 'src/db/sql/users.sql';

export async function DeleteUser({ body, session }: Request, res: Response) {
  try {
    let { email } = body;
    const { username } = session;

    // end request if body values are empty/null
    if (!email) {
      res.status(400).json({
        msg: 'All fields must have values...',
      });
      return;
    }

    const user_check = await dbq<Users>({
      query_string: check_username_and_email_query,
      query_params: [username!, email],
    });

    if (!user_check) {
      res.status(404).json({
        msg: 'Email must match Username...',
      });
      return;
    }

    const user = await dbq<Users>({
      query_string: delete_user_query,
      query_params: [user_check.id.toString()],
    });

    res.status(200).json({
      msg: `User ${user.username} has been deleted.`,
      status: 'success',
    });
  } catch (error) {
    const { code, json } = InternalError(error);
    res.status(code).json(json);
  }
}
