import type { Router } from 'express';
import glob from 'glob';
import { cfg } from 'src/util/env';

/** the default property comes from the export default convention */
interface DefaultRouter {
  default: Router;
}

/** All routers are coalesced into this exported array to be spread(...) as middleware */
export async function router(): Promise<Router[]> {
  return (
    await new Promise((resolve, _) => {
      glob(__dirname + '/routers/**/*.router.*', function (_, res) {
        Promise.all(
          res.map((file) => import(file.replace(cfg.rootdir, '/src')))
        ).then((modules) => resolve(modules));
      });
    }).then((modules) => modules as DefaultRouter[])
  ).map((m) => m.default);
}

// we are not catching any errors because if we cannot load these files
// the server will not work anyways. knowing the error happens in router.ts
// will be enough of a clue as that is the whole purpose of the file
