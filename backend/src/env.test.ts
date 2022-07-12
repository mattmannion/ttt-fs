// import { cfg } from 'src/env';
import * as testEnv from 'src/env';

const { cfg } = testEnv;
// const { prod } = testEnv;

describe('Checks if cfg methods return proper values for dev or production', function () {
  it('should return proper redis url', function () {
    const { host, port, url } = cfg.redis;

    expect(url).toBe(`redis://${host}:${port}`);
  });

  const { devlist, whitelist } = cfg.cors;

  it('test whitelist for dev', function () {
    expect(whitelist).toBe(devlist);
  });
});
