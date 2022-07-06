import glob from 'glob';
import { Router } from 'express';
import { cfg } from 'src/env';

/** the default property comes from the export default convention */
interface DefaultRouter {
  default: Router;
}

/** All routers are coalesced into this exported array to be spread(...) as middleware */
export async function router(): Promise<Router[]> {
  return (
    await new Promise((resolve, reject) => {
      glob(cfg.rootdir + '/routes/routers/**/*.js', function (err, res) {
        if (err) reject(err);
        else
          Promise.all(
            res.map((file) => import(file.replace(cfg.rootdir, 'src/')))
          ).then((modules) => resolve(modules));
      });
    }).then((modules) => modules as DefaultRouter[])
  ).map((m) => m.default);
}
