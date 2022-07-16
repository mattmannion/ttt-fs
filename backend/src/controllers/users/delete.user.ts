import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { dbq } from 'src/db/db';
import {
  check_username_and_email_query,
  delete_user_query,
} from 'src/db/sql/users.sql';

export async function DeleteUser({ body, session }: Request, res: Response) {
  let { email } = body;
  const { username } = session;

  // end request if body values are empty/null
  if (!email) {
    res.status(400).json({
      msg: 'Must provide email...',
    });
    return;
  }

  const user_check = await dbq<UsersModel>({
    query: check_username_and_email_query,
    params: [username!, email],
  });

  if (!user_check) {
    res.status(404).json({
      msg: 'Email must match Username...',
    });
    return;
  }

  const user = await dbq<UsersModel>({
    query: delete_user_query,
    params: [user_check.id.toString()],
  });

  res.status(200).json({
    msg: `User ${user.username} has been deleted.`,
    status: 'success',
  });
}
