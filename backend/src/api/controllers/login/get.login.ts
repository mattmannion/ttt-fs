import type { Request, Response } from 'express';

export async function GetLogin(req: Request, res: Response) {
  const { session } = req;
  const logged_in =
    session && session.username ? 'you are logged in' : 'you are not logged in';

  res.status(200).json({
    status: logged_in,
  });
}
