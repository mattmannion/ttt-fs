import { req, resp } from 'src/__mocks__/express.mock';
import { Logout } from 'src/controllers/login/delete.login';
import { app } from 'src/server';
import supertest from 'supertest';

// const ep = '/login';
jest.setTimeout(500);

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

  describe('login integration testing', () => {
    describe('Post Login testing', () => {
      it('must return status 400 if any field is empty', async () => {
        const res = await supertest(app).post('/login').send({});

        expect(res.status).toEqual(400);
      });
      it('must return status 200 if any field is empty', async () => {
        const res = await supertest(app)
          .post('/login')
          .send({ username: 'mm', password: 'mm' });

        expect(res.status).toEqual(200);
      });
      it('must return status 202 if any field is empty', async () => {
        const res = await supertest
          .agent(app)
          .post('/login')
          .send({ username: 'smackgr', password: 'smackdsadasdpass' });

        expect(res.status).toEqual(202);
      });
    });
  });
  describe('get login integration testing', () => {
    it('returns postive login message', async () => {
      const user = supertest.agent(app);

      await user.post('/login').send({ username: 'mm', password: 'mm' });
      const res = await user.get('/login');
      const { status } = JSON.parse(res.text);
      expect(status).toEqual('you are logged in');
    });

    it('returns negative login message', async () => {
      const user = supertest.agent(app);

      await user.post('/login').send({});
      const res = await user.get('/login');
      const { status } = JSON.parse(res.text);
      expect(status).toEqual('you are not logged in');
    });
  });
});
