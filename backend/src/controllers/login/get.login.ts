import type { Request, Response } from 'express';
import { InternalError } from 'src/util/util';

export async function GetLogin(req: Request, res: Response) {
  try {
    const { session } = req;
    const logged_in =
      session && session.username
        ? 'you are logged in'
        : 'you are not logged in';

    res.status(200).json({
      status: logged_in,
    });
  } catch (error) {
    const { code, json } = InternalError(error);
    res.status(code).json(json);
  }
}
