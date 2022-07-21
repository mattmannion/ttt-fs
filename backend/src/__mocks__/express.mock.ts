import type { Request, Response, NextFunction } from 'express';

export const req = <Request>{
  method: 'TEST',
  path: '/test-route',
  session: {
    username: undefined,
    destroy(fn: (err: any) => void) {
      fn(() => {});
    },
    cookie: {
      expires: undefined,
    },
  },
};

export const resp = () => {
  const res = <Response>{};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const next: NextFunction = jest.fn();
