import type { Request, Response } from 'express';
import { InternalError } from 'src/util/util';

export async function Logout(req: Request, res: Response) {
  try {
    let { session } = req;

    if (!session.username) {
      res.status(202).json({
        status: 'No user to logout',
      });
      return;
    }

    session.destroy(() => (session.cookie.expires = new Date()));

    res.status(200).json({
      status: 'Logout Successful',
    });
  } catch (error) {
    InternalError(error, res.status);
  }
}
