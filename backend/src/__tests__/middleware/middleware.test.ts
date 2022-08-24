import { check_auth } from 'src/api/middleware/auth/check_auth';
import { ep_log } from 'src/api/middleware/logger';
import { app } from 'src/server';
import { cfg } from 'src/util/env';
import { sleep } from 'src/util/util';
import { req, resp, next } from 'src/__mocks__/express.mock';
import supertest from 'supertest';

(async () => sleep(cfg.jest.sleep))();

describe('Middleware Test Suite', () => {
  describe('Cors Middleware', () => {
    it('tests cors whitelist success', async () => {
      const res = await supertest(app)
        .get('/users')
        .set('Origin', 'http://localhost:7890');

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
      expect(next).toBeCalled();
    });

    it('should 401 if session data is not set', () => {
      const res = resp();

      check_auth(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });

  describe('End Point Logger', () => {
    it('should run the logger if false', () => {
      const res = resp();

      ep_log(req, res, next, false);
      expect(next).toBeCalled();
    });

    it('should run the logger if true', () => {
      const res = resp();

      ep_log(req, res, next, true);
      expect(next).toBeCalled();
    });
  });
});
