import { Router } from 'express';
import { check_auth } from 'src/middleware/auth/check_auth';
import { GetProfile } from 'src/controllers/users/get.profile';
import { GetUsers } from 'src/controllers/users/get.users';
import { GetUser } from 'src/controllers/users/get.user';
import { PostUser } from 'src/controllers/users/post.user';
import { PutUser } from 'src/controllers/users/put.user';
import { DeleteUser } from 'src/controllers/users/delete.user';

const users = Router();

users.route('/users/:id').get(GetUser);

users.route('/users').get(GetUsers).post(PostUser);

users
  .use(check_auth)
  .route('/users')
  .put(PutUser)
  .patch(PutUser)
  .delete(DeleteUser);

users.use(check_auth).route('/profile').get(GetProfile);

export default users;
