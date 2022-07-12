import { cfg } from 'src/env';
// import * as testEnv from 'src/env';

describe('Checks if cfg methods return proper values for dev or production', function () {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should return proper redis url', function () {
    const { host, port, url } = cfg.redis;

    expect(url).toBe(`redis://${host}:${port}`);
  });

  it('should return proper redis url', function () {
    const { host, port, url } = cfg.redis;

    expect(url).toBe(`redis://${host}:${port}`);
  });

  it('should return proper whitelist', function () {
    process.env.NODE_ENV = 'prod';
    console.log(process.env.NODE_ENV);
    const { devlist, whitelist } = cfg.cors;

    expect(whitelist).toBe(devlist);
  });
});
