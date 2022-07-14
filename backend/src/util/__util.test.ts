import { InternalError, time_stamp } from 'src/util/util';

const MockError: unknown = {
  message: 'Mock Error Messge',
};

describe('Utility Test Suite', () => {
  it('must produce a server error', () => {
    expect(InternalError(MockError)).toStrictEqual({
      json: {
        msg: (<Error>MockError).message,
        status: 'failure',
      },
      code: 500,
    });
  });

  it('must create a date string', () => {
    expect(typeof time_stamp() === 'string').toBe(true);
  });
});

// Stand-alone test for prod
// process.env.NODE_ENV = 'prod' must
// be before the import statement
process.env.NODE_ENV = 'prod';
import { prod } from 'src/util/env';

it('tests for prod', () => {
  expect(prod).toBe(true);
});
