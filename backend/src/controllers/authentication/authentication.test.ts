import { req, resp } from 'src/__mocks__/express.mock';
import { Logout } from 'src/controllers/authentication/delete.login';

describe('checks if login functionalities are stable', () => {
  const res = resp();
  beforeEach(() => {
    req.session.username = 'mack';
    jest.clearAllMocks();
  });

  it('must return status 202 if no session username', () => {
    req.session.username = undefined;

    Logout(req, res);

    expect(res.status).toBeCalledWith(202);
    expect(res.json).toBeCalledWith({
      status: 'No user to logout',
    });
  });

  it('checks if session terminates and returns 200 status', () => {
    Logout(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ status: 'Logout Successful' });
  });
});
