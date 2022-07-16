import { dbq } from 'src/db/db';
import { util_replace_user_query } from 'src/db/sql/util.sql';
import { app } from 'src/server';
import supertest from 'supertest';

const u = '/users';
const l = '/login';

describe('/Users Test Suite', () => {
  describe('Delete User', () => {
    it('should give status 400', async () => {
      const user = supertest.agent(app);
      await user.post(l).send({ username: 'mm', password: 'mm' });

      const res = await user.delete(u);
      expect(res.statusCode).toEqual(400);
    });

    it('should give status 404', async () => {
      const user = supertest.agent(app);
      await user.post(l).send({ username: 'mm', password: 'mm' });

      const res = await user.delete(u).send({ email: 'mgr@mgr.com' });
      expect(res.statusCode).toEqual(404);
    });

    it('should give status 200', async () => {
      const user = supertest.agent(app);
      await user.post(l).send({ username: 'kr', password: 'kr' });

      const res = await user.delete(u).send({ email: 'kr@kr.com' });
      expect(res.statusCode).toEqual(200);

      await dbq({ query: util_replace_user_query });
    });
  });

  describe('Get Profile', () => {
    it('should get a users profile', async () => {
      const user = supertest.agent(app);
      await user.post(l).send({ username: 'mm', password: 'mm' });

      const res = await user.get('/profile');
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('Get One User', () => {
    it('should get one user', async () => {
      const res = await supertest(app).get(u + '/1');
      const data = JSON.parse(res.text);
      expect(data).toBeInstanceOf(Object);
    });

    it('should find no users', async () => {
      const res = await supertest(app).get(u + '/0');
      const data = JSON.parse(res.text);
      expect(data).toStrictEqual({
        status: 'failure',
        msg: 'User not found...',
      });
    });
  });

  describe('Get Users', () => {
    it('should get all users', async () => {
      const res = await supertest(app).get(u);
      const { users } = JSON.parse(res.text);
      expect(users).toBeInstanceOf(Array);
    });
  });

  describe('Post User', () => {
    it('should edit the found user', async () => {
      // user.post(li).send({ username: 'mm', password: 'mm' }).end();
    });
  });

  describe('Put User', () => {
    it('should edit the found user', async () => {
      // user.post(li).send({ username: 'mm', password: 'mm' }).end();
    });
  });
});
