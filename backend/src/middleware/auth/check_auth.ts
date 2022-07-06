import { Request, Response, NextFunction } from 'express';
export default function auth_check(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.session || !req.session.username)
      res.status(401).json({
        status: 'not authorized',
      });
    else next();
  } catch (error) {
    console.log(error);
  }
}
