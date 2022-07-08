import type { Response } from 'express';

export function InternalError(
  error: unknown,
  status: (code: number) => Response<any, Record<string, any>>
): void {
  const { message } = <Error>error;

  console.log(message);

  status(500).json({
    status: 'failure',
    msg: message,
  });
}

export const sleep = (s: number) => new Promise((r) => setTimeout(r, s));

export function time_stamp() {
  const t = new Date();
  return `>> ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
}
