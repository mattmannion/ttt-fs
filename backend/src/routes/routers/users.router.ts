import { Router } from 'express';
import { check_auth } from 'src/middleware/auth/check_auth';
import { GetProfile } from 'src/controllers/users/get.profile';
import { GetUsers } from 'src/controllers/users/get.users';
import { GetUser } from 'src/controllers/users/get.user';
import { PostUser } from 'src/controllers/users/post.user';
import { PutUser } from 'src/controllers/users/put.user';
import { DeleteUser } from 'src/controllers/users/delete.user';

const users_router = Router();

users_router.route('/users/:id').get(GetUser);

users_router.route('/users').get(GetUsers).post(PostUser);

users_router
  .use(check_auth)
  .route('/users')
  .put(PutUser)
  .patch(PutUser)
  .delete(DeleteUser);

users_router.use(check_auth).route('/profile').get(GetProfile);

export default users_router;
