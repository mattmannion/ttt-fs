import { GlobImport } from 'src/util/util';
export const models = GlobImport<any>({
  path: '/db/models',
  file_ext: '.model.*',
});
