import { cfg } from 'src/env';

describe('checks if cors whitelist works in dev env, and redis url returning expected string', function () {
  it('should return proper redis url', function () {
    const { host, port, url } = cfg.redis;

    expect(url).toBe(`redis://${host}:${port}`);
  });

  it('test whitelist for dev', function () {
    const { devlist, whitelist } = cfg.cors;
    expect(whitelist).toBe(devlist);
  });
});
