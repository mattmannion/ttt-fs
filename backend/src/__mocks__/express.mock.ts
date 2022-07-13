import type { NextFunction, Request, Response } from 'express';

export const req = <Request>{
  session: {
    username: undefined,
  },
};

export const resp = () => {
  const res = <Response>{};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const next: NextFunction = jest.fn();