import supertest from 'supertest';
import { req, resp } from 'src/__mocks__/express.mock';
import { Logout } from 'src/controllers/login/delete.login';
import { super_request, testapp } from 'src/util/util';
import { mw_cors } from 'src/middleware/cors';

const ep = '/login';

describe('Login test suite', () => {
  describe('MW Intergration Test', () => {
    it('tests logger', async () => {
      await super_request.get(ep);
    });
  });

  it('tests cors whitelist failure', async () => {
    const res = await supertest(
      testapp.use(mw_cors(new Set(['http://localhost:12345'])))
    ).get(ep);
    expect(res.status).toStrictEqual(500);
  });
});

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
