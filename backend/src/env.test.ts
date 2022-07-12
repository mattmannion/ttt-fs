process.env.NODE_ENV = 'prod';
import { prod } from 'src/env';

it('tests for prod', () => {
  expect(prod).toBe(true);
});
