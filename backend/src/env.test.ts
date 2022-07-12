process.env.NODE_ENV = 'prod';
import { prod } from 'src/env';

it('tests for prod', function () {
  expect(prod).toBe(true);
});
