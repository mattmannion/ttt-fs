import { Router } from 'express';
import { GlobImport } from 'src/util/util';

export const router = GlobImport<Router>({
  path: '/api/routes/routers',
  file_ext: '.router.*',
});
