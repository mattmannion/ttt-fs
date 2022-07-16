import { Router } from 'express';
import { Logout } from 'src/controllers/login/delete.login';
import { GetLogin } from 'src/controllers/login/get.login';
import { PostLogin } from 'src/controllers/login/post.login';
import { cfg } from 'src/util/env';

const login_router = Router();

login_router.route(cfg.ep.login).get(GetLogin).post(PostLogin).delete(Logout);

export default login_router;
