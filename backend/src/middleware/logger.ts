import type { Request, Response, NextFunction } from 'express';
import { time_stamp } from 'src/util/util';

/**
 * ep_log is middleware that takes in @param { path } from
 * the @typedef Request to extract the current end-point
 * along with the @function time_stamp and @param { method } from
 * the @typedef Request to @function console.log
 * the time a request was made to the server
 */
export function ep_log(
  { path, method }: Request,
  _res: Response,
  next: NextFunction
) {
  console.log(`${time_stamp()} - ${path} - ${method.toLocaleUpperCase()} `);
  next();
}

/** task_log is middleware that prints the time a task was started to the console */
export function task_log(_req: Request, _res: Response, next: NextFunction) {
  console.log('task started at ' + time_stamp());
  next();
}
