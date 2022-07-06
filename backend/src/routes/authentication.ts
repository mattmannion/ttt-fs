import { Router } from 'express';
import { Logout } from 'src/controllers/authentication/del.login';
import { GetLogin } from 'src/controllers/authentication/get.login';
import { PostLogin } from 'src/controllers/authentication/post.login';

const session = Router();

session.route('/login').get(GetLogin).post(PostLogin).delete(Logout);

export default session;
