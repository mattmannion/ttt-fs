import { Router } from 'express';
import { Logout } from 'src/api/controllers/login/delete.login';
import { GetLogin } from 'src/api/controllers/login/get.login';
import { PostLogin } from 'src/api/controllers/login/post.login';
import { check_auth } from 'src/api/middleware/auth/check_auth';
import { cfg } from 'src/util/env';

const login_router = Router();

login_router
  .route(cfg.ep.login)
  .get(GetLogin)
  .post(PostLogin)
  .delete(check_auth, Logout);

export default login_router;
