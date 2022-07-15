import type { Request, Response } from 'express';
import type { UsersModel } from 'src/db/models/Users.model';
import { InternalError } from 'src/util/util';
import { dbq } from 'src/db/db';
import {
  check_username_and_email_query,
  get_user_query,
  put_user_query,
} from 'src/db/sql/users.sql';

export async function PutUser({ body, session }: Request, res: Response) {
  try {
    let { firstname, lastname, email, password } = body;
    const { username } = session;

    if (!email) {
      res.status(400).json({
        msg: 'Must enter a email...',
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
      query: get_user_query,
      params: [user_check.id.toString()],
    });

    firstname = firstname ? firstname : user.firstname;
    lastname = lastname ? lastname : user.lastname;
    password = password ? password : user.password;

    await dbq<UsersModel>({
      query: put_user_query,
      params: [user_check.id.toString(), firstname, lastname, password],
    });

    res.status(200).json({
      msg: `User ${user.username} has been updated.`,
      status: 'success',
    });
  } catch (error) {
    const { code, json } = InternalError(error);
    res.status(code).json(json);
  }
}
