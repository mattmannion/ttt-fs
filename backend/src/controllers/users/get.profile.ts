import { Request, Response } from 'express';

export async function GetProfile(req: Request, res: Response) {
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
