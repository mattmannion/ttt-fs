import type { Request, Response } from 'express';

export async function GetProfile(req: Request, res: Response) {
  const { session } = req;

  res.status(200).json({
    session,
    status: 'success',
  });
}
