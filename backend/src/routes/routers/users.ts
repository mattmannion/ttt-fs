import { Router } from 'express';
import auth_check from 'src/middleware/auth/check_auth';
import { GetProfile } from 'src/controllers/users/get.profile';
import { GetUsers } from 'src/controllers/users/get.users';
import { GetUser } from 'src/controllers/users/get.user';
import { PostUser } from 'src/controllers/users/post.user';
import { PutUser } from 'src/controllers/users/put.user';
import { DeleteUser } from 'src/controllers/users/delete.user';

const users = Router();

users
  .route('/users')
  .get(GetUsers)
  .post(PostUser)
  .put(PutUser)
  .patch(PutUser)
  .delete(DeleteUser);

users.route('/users/:id').get(GetUser);

users.use(auth_check).route('/profile').get(GetProfile);

export default users;
