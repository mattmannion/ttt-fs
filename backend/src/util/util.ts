import type { SessionData } from 'express-session';
import glob from 'glob';
import SQL from 'sql-template-strings';
import { session_store } from 'src/db/redis';
import { cfg } from 'src/util/env';

/** allows for correct casing to work with vscode plugin */
export const sql = SQL;

/** puts operation to sleep for x milis */
export const sleep = (sec: number) =>
  new Promise((res) => setTimeout(res, sec));

/** the default property comes from the export default convention */
interface Default<T> {
  default: T;
}

interface GlobImport {
  path: string;
  file_ext?: string;
}

/** creates array of imports based on path and optional file extention [*.(j|t)s] */
export async function GlobImport<T>({
  path,
  file_ext,
}: GlobImport): Promise<T[]> {
  !file_ext && (file_ext = '');
  return (
    await new Promise<Default<T>[]>((resolve, _reject) => {
      glob(cfg.rootdir + path + '/**/*' + file_ext, function (_error, res) {
        Promise.all(
          res
            // removes any test files
            .filter(
              (f) =>
                !f.endsWith('.test.js') &&
                !f.endsWith('.spec.js') &&
                !f.endsWith('.test.ts') &&
                !f.endsWith('.spec.ts')
            )
            .map((file) => import(file.replace(cfg.rootdir, 'src')))
        ).then((m) => resolve(m));
      });
    }).then((m) => m)
  ).map((m) => m.default);
  // we are not catching any errors because if we cannot load these files
  // the server will not work anyways. knowing which file the error is in
  // will be enough of a clue. catch blocks will also grab any errors.
}

export function InternalError(error: unknown) {
  return {
    json: {
      status: 'failure',
      msg: (<Error>error).message,
    },
    code: 500,
  };
}

export function time_stamp(): string {
  const d = new Date();
  return `>> ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

export interface ClientSession {
  session: SessionData;
}

export function SetSess(
  data: ClientSession,
  fn: (session: SessionData) => void
): void {
  if (data && data.session && data.session.sid) {
    const { sid } = data.session;
    session_store.get(sid, (_, session) => {
      if (session && session.sid) {
        fn(session);
        session_store.set(sid, session);
      }
    });
  }
}

export function UseSess(
  data: ClientSession,
  fn: (session: SessionData) => void
): void {
  if (data && data.session && data.session.sid) {
    const { sid } = data.session;
    session_store.get(sid, (_, session) => {
      if (session) fn(session);
    });
  }
}
