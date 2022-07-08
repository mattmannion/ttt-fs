import { Router } from 'express';
import { Logout } from 'src/controllers/authentication/delete.login';
import { GetLogin } from 'src/controllers/authentication/get.login';
import { PostLogin } from 'src/controllers/authentication/post.login';

const auth = Router();

auth.route('/login').get(GetLogin).post(PostLogin).delete(Logout);

export default auth;
