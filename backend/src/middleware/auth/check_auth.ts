import { Request, Response, NextFunction } from 'express';
import { InternalError } from 'src/util/util';

export function check_auth(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session || !req.session.username)
      res.status(401).json({
        status: 'not authorized',
      });
    else next();
  } catch (error) {
    const { code, json } = InternalError(error);
    res.status(code).json(json);
  }
}
