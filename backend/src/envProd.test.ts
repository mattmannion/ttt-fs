process.env.NODE_ENV = 'prod';
import { cfg } from 'src/env';

describe('checks if cors whitelist works in prod env', function () {
  const { prodlist, whitelist } = cfg.cors;

  it('test whitelist for prod', () => {
    console.log(process.env.NODE_ENV);
    expect(whitelist).toBe(prodlist);
  });
});
