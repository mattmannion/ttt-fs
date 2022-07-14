import { app } from 'src/server';
import supertest from 'supertest';

describe('User Test Suite', () => {
  describe('Get Users', () => {
    it('should get all users', async () => {
      const res = await supertest(app).get('/users');
      const { users } = JSON.parse(res.text);
      expect(users).toBeInstanceOf(Array);
    });
  });
});
