import { Request, Response, NextFunction } from 'express';

export function check_auth(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.username)
    res.status(401).json({
      status: 'not authorized',
    });
  else next();
}
