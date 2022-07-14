import { check_auth } from 'src/middleware/auth/check_auth';
import { app } from 'src/server';
import { req, resp, next } from 'src/__mocks__/express.mock';
import supertest from 'supertest';

describe('Middleware Test Suite', () => {
  describe('Cors Middleware', () => {
    it('tests cors whitelist success', async () => {
      const res = await supertest(app).get('/users');

      expect(res.status).toStrictEqual(200);
    });

    it('tests cors whitelist failure', async () => {
      const res = await supertest(app)
        .get('/users')
        .set('Origin', 'http://localhost:1234');
      expect(res.status).toStrictEqual(500);
    });
  });

  describe('Authorization middleware', () => {
    beforeEach(() => {
      req.session.username = undefined;
    });

    it('should call the next when data is set', () => {
      const res = resp();
      req.session.username = 'mm';
      check_auth(req, res, next);
      expect(next).toBeCalledTimes(1);
    });

    it('should 401 if session data is not set', () => {
      const res = resp();
      check_auth(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});
