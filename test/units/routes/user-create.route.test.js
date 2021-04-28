const request = require('supertest');
const { ERRORS, VALIDATION_MSG } = require('../../../src/configs/constant');

// INFO Mocks

jest.mock('../../../src/sequelize/models');
const { User } = require('../../../src/sequelize/models');

const init = require('../../../src/server');

let app;

describe('POST /api/user - validation firstName', () => {
  beforeAll(async () => {
    app = await init();
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  it('should throw 422 error - if firstName is empty', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({ firstName: '' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('msg', VALIDATION_MSG.NOT_EMPTY);
    expect(error.errors[0]).toHaveProperty('param', 'firstName');
  });
  it('should throw 422 error - if firstName is less than 3 character', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({ firstName: 'ab' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('msg', VALIDATION_MSG.IS_LENGTH(3));
    expect(error.errors[0]).toHaveProperty('param', 'firstName');
  });
  it('should throw 422 error - if firstName is contain anything beside letter', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({ firstName: 'ab123' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('msg', VALIDATION_MSG.IS_ALPHA);
    expect(error.errors[0]).toHaveProperty('param', 'firstName');
  });
});

describe('POST /api/user - validation lastName', () => {
  beforeEach(async () => {
    app = await init();
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  it('should throw 422 error - if lastName is empty', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({ firstName: 'hello', lastName: '' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'lastName');
    expect(error.errors[0]).toHaveProperty('msg', VALIDATION_MSG.NOT_EMPTY);
  });
  it('should throw 422 error - if lastName is less than 3 character', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({ firstName: 'hello', lastName: 'ad' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'lastName');
    expect(error.errors[0]).toHaveProperty('msg', VALIDATION_MSG.IS_LENGTH(3));
  });

  it('should throw 422 error - if lastName is contain anything beside letter', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({ firstName: 'hello', lastName: 'abc1234' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'lastName');
    expect(error.errors[0]).toHaveProperty('msg', VALIDATION_MSG.IS_ALPHA);
  });
});

describe('POST /api/user - validation email', () => {
  beforeEach(async () => {
    app = await init();
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  it('should throw 422 error - if email is empty', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'hello',
        email: '',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'email');
    expect(error.errors[0]).toHaveProperty('msg', VALIDATION_MSG.NOT_EMPTY);
  });

  it('should throw 422 error - if email is in wrong format', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'hello',
        email: '123@',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'email');
    expect(error.errors[0]).toHaveProperty('msg', VALIDATION_MSG.IS_EMAIL);
  });
});

describe('POST /api/user - validation password', () => {
  beforeEach(async () => {
    app = await init();
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  it('should throw 422 error - if email is empty', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'hello',
        email: 'test@test.com',
        password: '',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'password');
    expect(error.errors[0]).toHaveProperty('msg', VALIDATION_MSG.NOT_EMPTY);
  });

  it('should throw 422 error - if password is less than 8 characters', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'hello',
        email: 'test@test.com',
        password: '1234567',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'password');
    expect(error.errors[0]).toHaveProperty(
      'msg',
      VALIDATION_MSG.IS_LENGTH_MIN_MAX(8, 16)
    );
  });

  it('should throw 422 error - if password is more than 16 characters', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'hello',
        email: 'test@test.com',
        password: '123456789abcdefgh',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'password');
    expect(error.errors[0]).toHaveProperty(
      'msg',
      VALIDATION_MSG.IS_LENGTH_MIN_MAX(8, 16)
    );
  });

  it('should throw 422 error - if password is not contain lowercase character', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'hello',
        email: 'test@test.com',
        password: 'ABCDEFG123$',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'password');
    expect(error.errors[0]).toHaveProperty(
      'msg',
      VALIDATION_MSG.PASSWORD_FORMAT
    );
  });

  it('should throw 422 error - if password is not contain uppercase character', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'hello',
        email: 'test@test.com',
        password: 'abcdefg123$',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'password');
    expect(error.errors[0]).toHaveProperty(
      'msg',
      VALIDATION_MSG.PASSWORD_FORMAT
    );
  });

  it('should throw 422 error - if password is not contain number', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'hello',
        email: 'test@test.com',
        password: 'abcdefgABCD$',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'password');
    expect(error.errors[0]).toHaveProperty(
      'msg',
      VALIDATION_MSG.PASSWORD_FORMAT
    );
  });

  it('should throw 422 error - if password is not contain special character', async () => {
    const res = await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'hello',
        email: 'test@test.com',
        password: '1234Acheer',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);

    expect.assertions(7);
    expect(res).toHaveProperty('statusCode', 422);
    const error = res.body.error;
    expect(error).toHaveProperty('msg', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors[0]).toHaveProperty('location', 'body');
    expect(error.errors[0]).toHaveProperty('param', 'password');
    expect(error.errors[0]).toHaveProperty(
      'msg',
      VALIDATION_MSG.PASSWORD_FORMAT
    );
  });
});

describe('POST /api/user - successfully validate all data', () => {
  it('should call User.create with lowercase for fistName, lastName, and email', async () => {
    await request(app)
      .post('/api/user')
      .send({
        firstName: 'hello',
        lastName: 'HeLlO',
        email: ' tEsT@test.cOm',
        password: 'test1234B$',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);

    expect.assertions(2);
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith({
      firstName: 'hello',
      lastName: 'hello',
      email: 'test@test.com',
      password: 'test1234B$',
    });
  });
});
