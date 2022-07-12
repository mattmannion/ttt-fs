// import { cfg } from 'src/env';
process.env.NODE_ENV = 'prod';
import * as testEnv from 'src/env';

const { cfg } = testEnv;
// const { prod } = testEnv;

describe('Checks if cfg methods return proper values for dev or production', function () {
  const { prodlist, whitelist } = cfg.cors;

  process.env.NODE_ENV = 'prod';
  console.log(process.env.NODE_ENV);
  it('test whitelist for prod', () => {
    console.log(process.env.NODE_ENV);
    expect(whitelist).toBe(prodlist);
  });
});
