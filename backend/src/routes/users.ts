import { Router } from 'express';
import auth_check from 'src/middleware/auth/check_auth';
import { GetProfile } from 'src/controllers/users/get.profile';
import { GetUsers } from 'src/controllers/users/get.users';

const users = Router();

users.route('/users').get(GetUsers);

users.use(auth_check).route('/profile').get(GetProfile);

export default users;
