import { redis } from 'src/db/redis';
import { app } from 'src/server';
import supertest from 'supertest';

const ep = '/users';
const li = '/login';

describe('/Users Test Suite', () => {
  describe('Get Users', () => {
    it('should get all users', async () => {});
  });

  describe('Get One User', () => {
    it('should get one user', async () => {});

    it('should find no users', async () => {
      // supertest(app)
      //   .get(ep + '/0')
      //   .expect((res) => res.status === 404)
      //   .end();
      // expect(data).toStrictEqual({
      //   status: 'failure',
      //   msg: 'User not found...',
      // });
    });
  });

  describe('Put User', () => {
    it('should edit the found user', async () => {
      // user.post(li).send({ username: 'mm', password: 'mm' }).end();
    });
  });

  describe('Delete User', () => {
    beforeEach(async () => {
      await redis.connect();
    });

    it('should give status 400', async () => {
      const user = supertest.agent(app);
      await user.post(li).send({ username: 'mm', password: 'mm' });
      const res = await user.delete(ep);
      console.log('text', res.text);
    });
  });
});
