// process.env.NODE_ENV = 'prod' must
// be before the import statement
process.env.NODE_ENV = 'prod';
import { prod } from 'src/util/env';
import { Router } from 'express';
import { GlobImport, InternalError, time_stamp } from 'src/util/util';
import users_router from 'src/routes/routers/users.router';

jest.setTimeout(500);

const MockError: unknown = {
  message: 'Mock Error Messge',
};

describe('Utility Test Suite', () => {
  describe('General Utils', () => {
    it('must produce a server error', () => {
      expect(InternalError(MockError)).toStrictEqual({
        json: {
          msg: (<Error>MockError).message,
          status: 'failure',
        },
        code: 500,
      });
    });

    it('must create a date string', () => {
      expect(typeof time_stamp() === 'string').toBe(true);
    });

    it('tests for prod', () => {
      expect(prod).toBe(true);
    });
  });

  describe('GlobImport', () => {
    let router: Router[];

    it('must conain a router', async () => {
      router = await GlobImport<Router>({
        path: '/routes/routers',
        file_ext: '.router.*',
      });

      expect(router).toContain(users_router);
    });

    it('must return an array', async () => {
      router = await GlobImport<Router>({
        path: '/routes/routers',
        file_ext: '.router.*',
      });

      expect(router).toBeInstanceOf(Array);
    });

    it('tests file_ext as undefined', async () => {
      router = await GlobImport<Router>({
        path: '/routes/routers',
      });

      expect(router).toBeInstanceOf(Array);
    });
  });
});
