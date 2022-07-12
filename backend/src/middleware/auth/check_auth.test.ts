import type { NextFunction, Request, Response } from 'express';
import { check_auth } from 'src/middleware/auth/check_auth';

describe('Authorization middleware', () => {
  let request: () => Request;
  let response: () => Response;
  let next: NextFunction;

  beforeEach(() => {
    request = () => {
      return {
        session: {
          username: '',
        },
      } as Request;
    };

    response = () => {
      const res = {} as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };

    next = jest.fn();
  });

  it('should 401 if session data is not set', () => {
    const req = request();
    const res = response();
    req.session = undefined!;
    check_auth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should 200 with username from session if session data is set', () => {
    const req = request();
    const res = response();
    req.session.username = 'mm';
    check_auth(req, res, next);
    expect(next).toBeCalledTimes(1);
  });
});
