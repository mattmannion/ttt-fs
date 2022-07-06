import { Request, Response } from 'express';
import { logger } from 'src/util/util';

export async function GetProfile(req: Request, res: Response) {
  logger(req);

  try {
    const { session } = req;

    res.status(200).json({
      session,
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
}
