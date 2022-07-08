import type { Request, Response } from 'express';
import type { Users } from 'src/models/Users';
import { dbq } from 'src/db/db';
import {
  check_username_and_email_query,
  delete_user_query,
} from 'src/db/sql/users.sql';

export async function DeleteUser({ body }: Request, res: Response) {
  try {
    let { username, email } = body;

    // end request if body values are empty/null
    if (!username || !email) {
      res.status(400).json({
        msg: 'All fields must have values...',
      });
      return;
    }

    const user_check = await dbq<Users>({
      query_string: check_username_and_email_query,
      query_params: [username, email],
      query_rows: 'one',
    });

    if (!user_check) {
      res.status(404).json({
        msg: 'No user found',
      });
      return;
    }

    const user = await dbq<Users>({
      query_string: delete_user_query,
      query_params: [user_check.id.toString()],
      query_rows: 'one',
    });

    res.status(200).json({
      msg: `User ${user.username} has been deleted.`,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
}
