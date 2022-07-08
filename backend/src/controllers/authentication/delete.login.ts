import type { Request, Response } from 'express';

export async function Logout(req: Request, res: Response) {
  try {
    let { session } = req;

    if (!session.username)
      return res.status(202).json({
        status: 'No user to logout',
      });

    session.destroy(() => (session.cookie.expires = new Date()));

    return res.status(200).json({
      status: 'Logout Successful',
    });
  } catch (error) {
    return console.log(error);
  }
}
