import { InternalError, time_stamp } from 'src/util/util';

const MockError: unknown = {
  message: 'Mock Error Messge',
};

describe('tests for utilities', () => {
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
