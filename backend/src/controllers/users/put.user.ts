import type { Request, Response } from 'express';
import type { Users } from 'src/models/Users';
import { dbq } from 'src/db/db';
import {
  check_username_and_email_query,
  get_user_query,
  put_user_query,
} from 'src/db/sql/users.sql';

export async function PutUser({ body }: Request, res: Response) {
  try {
    let { firstname, lastname, username, email, password } = body;

    if (!username || !email) {
      res.status(400).json({
        msg: 'Must enter valid username and email',
      });
      return;
    }

    const user_check = await dbq<Users>({
      query_string: check_username_and_email_query,
      query_params: [username, email],
    });

    if (!user_check) {
      res.status(404).json({
        msg: 'No user found',
      });
      return;
    }

    const user = await dbq<Users>({
      query_string: get_user_query,
      query_params: [user_check.id.toString()],
    });

    firstname = firstname ? firstname : user.firstname;
    lastname = lastname ? lastname : user.lastname;
    password = password ? password : user.password;

    await dbq<Users>({
      query_string: put_user_query,
      query_params: [user_check.id.toString(), firstname, lastname, password],
    });

    res.status(200).json({
      msg: `User ${user.username} has been updated.`,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
}
