import { router } from 'src/routes/router';
import users from 'src/routes/routers/users';

describe('testing router', () => {
  it('must contain an express router', async () => {
    expect(await router()).toContain(users);
  });

  it('must return an array', async () => {
    expect(await router()).toBeInstanceOf(Array);
  });
});
