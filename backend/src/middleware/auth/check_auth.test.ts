import { check_auth } from 'src/middleware/auth/check_auth';
import { req, resp, next } from 'src/__mocks__/express.mock';

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
