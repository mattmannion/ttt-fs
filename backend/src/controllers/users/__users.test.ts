import { super_request } from 'src/util/util';

describe('User Test Suite', () => {
  describe('Get Users', () => {
    it('should get all users', async () => {
      const res = await super_request.get('/users');
      const { users } = JSON.parse(res.text);
      expect(users).toBeInstanceOf(Array);
    });
  });
});
