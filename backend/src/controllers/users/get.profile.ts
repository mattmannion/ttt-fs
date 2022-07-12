import type { Request, Response } from 'express';
import { InternalError } from 'src/util/util';

export async function GetProfile(req: Request, res: Response) {
  try {
    const { session } = req;

    res.status(200).json({
      session,
      status: 'success',
    });
  } catch (error) {
    const { code, json } = InternalError(error);
    res.status(code).json(json);
  }
}
