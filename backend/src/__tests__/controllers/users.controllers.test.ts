process.env.NODE_ENV = 'test';
import { dbq } from 'src/db/db';
import {
  util_delete_user_query,
  util_replace_user_query,
} from 'src/db/sql/util.sql';
import { app } from 'src/server';
import supertest from 'supertest';
import bc from 'bcryptjs';
import { sleep } from 'src/util/util';
import { cfg } from 'src/util/env';

(async () => sleep(cfg.jest.sleep))();

jest.setTimeout(20000);

describe('/Users Test Suite', () => {
  describe('Delete User', () => {
    it('should give status 400', async () => {
      const user = supertest.agent(app);
      await user.post(cfg.ep.login).send({ username: 'mm', password: 'mm' });

      const res = await user.delete(cfg.ep.users);

      expect(res.statusCode).toEqual(400);
    });

    it('should give status 404', async () => {
      const user = supertest.agent(app);
      await user.post(cfg.ep.login).send({ username: 'mm', password: 'mm' });

      const res = await user
        .delete(cfg.ep.users)
        .send({ email: 'mgr@mgr.com' });

      expect(res.statusCode).toEqual(404);
    });

    it('should give status 200', async () => {
      const user = supertest.agent(app);
      await user.post(cfg.ep.login).send({ username: 'kr', password: 'kr' });

      const res = await user.delete(cfg.ep.users).send({ email: 'kr@kr.com' });
      expect(res.statusCode).toEqual(200);

      await dbq({
        query: util_replace_user_query,
        params: [await bc.hash('kr', cfg.bcrypt.test)],
      });
    });
  });

  describe('Get Profile', () => {
    it('should get a users profile', async () => {
      const user = supertest.agent(app);
      await user.post(cfg.ep.login).send({ username: 'mm', password: 'mm' });

      const res = await user.get('/profile');
      expect(res.statusCode).toEqual(200);
    });
  });

  describe('Get One User', () => {
    it('should get one user', async () => {
      const res = await supertest(app).get(cfg.ep.users + '/1');

      expect(JSON.parse(res.text)).toBeInstanceOf(Object);
    });

    it('should find no users', async () => {
      const res = await supertest(app).get(cfg.ep.users + '/0');

      expect(JSON.parse(res.text)).toStrictEqual({
        status: 'failure',
        msg: 'User not found...',
      });
    });
  });

  describe('Get Users', () => {
    it('should get all users', async () => {
      const res = await supertest(app).get(cfg.ep.users);
      const { users } = JSON.parse(res.text);

      expect(users).toBeInstanceOf(Array);
    });
  });

  describe('Post User', () => {
    it('should fail if data is missing from req body', async () => {
      const res = await supertest(app).post(cfg.ep.users).send({
        firstname: '',
        lastname: 'mannion',
        email: '',
        username: 'mm',
        password: 'mm',
      });

      expect(JSON.parse(res.text)).toBeInstanceOf(Object);
      expect(res.status).toEqual(400);
    });

    it('should fail if user exists', async () => {
      const res = await supertest(app).post(cfg.ep.users).send({
        firstname: 'matt',
        lastname: 'mannion',
        email: 'mm@mm.com',
        username: 'mm',
        password: 'mm',
      });

      expect(JSON.parse(res.text)).toBeInstanceOf(Object);
      expect(res.status).toEqual(403);
    });

    it('should post a new user', async () => {
      const res = await supertest(app).post(cfg.ep.users).send({
        firstname: 'don',
        lastname: 'trickler',
        email: 'dt@dt.com',
        username: 'dt',
        password: 'dt',
      });

      expect(JSON.parse(res.text)).toBeInstanceOf(Object);
      expect(res.status).toEqual(200);

      await dbq({ query: util_delete_user_query });
    });
  });

  describe('Put User', () => {
    it('should check for an email', async () => {
      const user = supertest.agent(app);
      await user.post(cfg.ep.login).send({ username: 'mm', password: 'mm' });

      const res = await user.put(cfg.ep.users);

      expect(JSON.parse(res.text)).toEqual({ msg: 'Must enter a email...' });
      expect(res.statusCode).toEqual(403);
    });

    it('should make sure email matches user', async () => {
      const user = supertest.agent(app);
      await user.post(cfg.ep.login).send({ username: 'mm', password: 'mm' });

      const res = await user.put(cfg.ep.users).send({ email: 'mgr@mgr.com' });

      expect(JSON.parse(res.text)).toEqual({
        msg: 'Email must match Username...',
      });
      expect(res.statusCode).toEqual(403);
    });

    it('should make sure email matches user - nothing changes', async () => {
      const user = supertest.agent(app);
      await user.post(cfg.ep.login).send({ username: 'mm', password: 'mm' });

      const res = await user.put(cfg.ep.users).send({ email: 'mm@mm.com' });
      expect(res.statusCode).toEqual(204);
    });

    it('should make sure email matches user - all fields changed', async () => {
      const user = supertest.agent(app);
      await user.post(cfg.ep.login).send({ username: 'mm', password: 'mm' });

      const res = await user.put(cfg.ep.users).send({
        email: 'mm@mm.com',
        firstname: 'matt',
        lastname: 'mannion',
        password: 'mm',
      });

      expect(res.statusCode).toEqual(204);
    });
  });
});
