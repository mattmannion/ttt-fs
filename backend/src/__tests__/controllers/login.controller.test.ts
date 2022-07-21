process.env.NODE_ENV = 'test';
import { req, resp } from 'src/__mocks__/express.mock';
import { Logout } from 'src/controllers/login/delete.login';
import { app } from 'src/server';
import supertest from 'supertest';
import { sleep } from 'src/util/util';
import { cfg } from 'src/util/env';

(async () => sleep(cfg.jest.sleep))();

describe('Login test suite', () => {
  describe('Delete Suite', () => {
    const res = resp();
    beforeEach(() => {
      req.session.username = 'mack';
      jest.clearAllMocks();
    });

    it('must return status 202 if no session username', () => {
      req.session.username = undefined;

      Logout(req, res);

      expect(res.status).toBeCalledWith(202);
      expect(res.json).toBeCalledWith({ status: 'No user to logout' });
    });

    it('checks if session terminates and returns 200 status', () => {
      Logout(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({ status: 'Logout Successful' });
    });
  });

  describe('Post Login testing', () => {
    it('must return status 400 if any field is empty', async () => {
      const res = await supertest(app).post(cfg.ep.login);

      expect(res.status).toEqual(400);
    });

    it('must return status 206 if Username is wrong', async () => {
      const res = await supertest
        .agent(app)
        .post(cfg.ep.login)
        .send({ username: 'smackgr', password: 'smackdsadasdpass' });

      expect(res.status).toEqual(206);
    });

    it('must return status 206 if Password is wrong', async () => {
      const res = await supertest
        .agent(app)
        .post(cfg.ep.login)
        .send({ username: 'mm', password: 'smackdsadasdpass' });

      expect(res.status).toEqual(206);
    });

    it('must return status 200 logs in', async () => {
      const res = await supertest(app)
        .post(cfg.ep.login)
        .send({ username: 'mm', password: 'mm' });

      expect(res.status).toEqual(200);
    });
  });

  describe('get login integration testing', () => {
    it('returns postive login message', async () => {
      const user = supertest.agent(app);

      await user.post(cfg.ep.login).send({ username: 'mm', password: 'mm' });
      const res = await user.get(cfg.ep.login);
      const { status } = JSON.parse(res.text);

      expect(status).toEqual('you are logged in');
    });

    it('returns negative login message', async () => {
      const user = supertest.agent(app);

      await user.post(cfg.ep.login).send({});
      const res = await user.get(cfg.ep.login);
      const { status } = JSON.parse(res.text);

      expect(status).toEqual('you are not logged in');
    });
  });
});
