import { Request } from 'express';

export const sleep = (s: number) => new Promise((r) => setTimeout(r, s));

export const time_stamp = () => {
  const t = new Date();
  console.log(`started at ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`);
};

export const logger = (req: Request) => {
  const t = new Date();

  console.log(
    `>> ${req.path} - ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
  );
};
