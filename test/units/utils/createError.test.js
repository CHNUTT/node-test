const createError = require('../../../src/utils/createError');
const { ERRORS } = require('../../../src/configs/constant');

describe('Utils - createError', () => {
  it('should be a function', () => {
    expect.assertions(1);
    expect(typeof createError).toBe('function');
  });

  it('should return error object with only empty string as message - if not passing anything', () => {
    const err = createError();
    expect.assertions(4);
    expect(err).toBeInstanceOf(Error);
    expect(err).toHaveProperty('message', '');
    expect(err).not.toHaveProperty('errors');
    expect(err).not.toHaveProperty('statusCode');
  });

  it('should return error object with correct message, and statusCode', () => {
    const err = createError(ERRORS.CODE_422_MSG, 422);
    expect.assertions(4);
    expect(err).toBeInstanceOf(Error);
    expect(err).toHaveProperty('message', ERRORS.CODE_422_MSG);
    expect(err).toHaveProperty('statusCode', 422);
    expect(err).not.toHaveProperty('errors');
  });

  it('should return error object with correct message, statusCode, and errors as array', () => {
    const err = createError(ERRORS.CODE_422_MSG, 422, [{}, {}, {}]);
    expect.assertions(6);
    expect(err).toBeInstanceOf(Error);
    expect(err).toHaveProperty('message', ERRORS.CODE_422_MSG);
    expect(err).toHaveProperty('statusCode', 422);
    expect(err).toHaveProperty('errors');
    expect(err.errors).toBeInstanceOf(Array);
    expect(err.errors).toHaveLength(3);
  });
});
