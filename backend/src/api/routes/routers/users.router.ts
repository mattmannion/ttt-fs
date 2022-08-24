import { Router } from 'express';
import { check_auth } from 'src/api/middleware/auth/check_auth';
import { GetProfile } from 'src/api/controllers/users/get.profile';
import { GetUsers } from 'src/api/controllers/users/get.users';
import { GetUser } from 'src/api/controllers/users/get.user';
import { PostUser } from 'src/api/controllers/users/post.user';
import { PutUser } from 'src/api/controllers/users/put.user';
import { DeleteUser } from 'src/api/controllers/users/delete.user';
import { cfg } from 'src/util/env';

const users_router = Router();

users_router.route(cfg.ep.users + '/:id').get(GetUser);

users_router.route(cfg.ep.users).get(GetUsers).post(PostUser);

users_router
  .route(cfg.ep.users)
  .put(check_auth, PutUser)
  .patch(check_auth, PutUser)
  .delete(check_auth, DeleteUser);

users_router.route(cfg.ep.profile).get(check_auth, GetProfile);

export default users_router;
