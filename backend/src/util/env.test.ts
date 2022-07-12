// process.env.NODE_ENV = 'prod' must be line one
process.env.NODE_ENV = 'prod';

import { prod } from 'src/util/env';

it('tests for prod', () => {
  expect(prod).toBe(true);
});
