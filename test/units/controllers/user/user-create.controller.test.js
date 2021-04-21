const UserControllers = require('../../../../src/controllers/user.controllers');
const httpMocks = require('node-mocks-http');
const { ERRORS } = require('../../../../src/configs/constant');

// INFO Mocks
const userObjectMockClientRequest = require('../../../__mocks__/user/requestUser.json');

const usersArrayMockDatabase = require('../../../__mocks__/user/createdUsers.json');

jest.mock('express-validator');
const { validationResult } = require('express-validator');

jest.mock('../../../../src/sequelize/models');
const { User } = require('../../../../src/sequelize/models');

let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

describe('User Controller - createUser', () => {
  beforeEach(() => {
    validationResult.mockReturnValue({
      isEmpty: () => true,
      errors: [],
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllMocks();
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });
  it('should be a funcion', () => {
    expect.assertions(1);
    expect(typeof UserControllers.createUser).toBe('function');
  });

  it('should pass error with code "422" and message "Invalid input(s)" through next function - if client request body is failed to be validated', async () => {
    validationResult.mockReturnValue({
      isEmpty: () => false,
      errors: require('../../../__mocks__/errors/express-validator/erros.json'),
    });

    await UserControllers.createUser(req, res, (err) => {
      error = err;
    });

    expect.assertions(7);
    expect(error).toBeTruthy();
    expect(error).toBeInstanceOf(Error);
    expect(error).toHaveProperty('message', ERRORS.CODE_422_MSG);
    expect(error).toHaveProperty('statusCode', 422);
    expect(error).toHaveProperty('errors');
    expect(error.errors).toBeInstanceOf(Array);
    expect(error.errors).toHaveLength(3);
  });

  it('should pass error through next function - if something wrong with database connection', async () => {
    req.body = userObjectMockClientRequest;
    User.create.mockImplementation(() => {
      throw new Error();
    });

    let error;

    await UserControllers.createUser(req, res, (err) => {
      error = err;
    });
    expect.assertions(5);
    expect(error).toBeTruthy();
    expect(error).toBeInstanceOf(Error);
    expect(error).toHaveProperty('message', '');
    expect(error).not.toHaveProperty('statusCode');
    expect(error).not.toHaveProperty('errors');
  });

  it('should pass error through next function - if User.create return falsy value', async () => {
    req.body = userObjectMockClientRequest;
    User.create.mockReturnValue(undefined);

    let error;

    await UserControllers.createUser(req, res, (err) => {
      error = err;
    });
    expect.assertions(5);
    expect(error).toBeTruthy();
    expect(error).toBeInstanceOf(Error);
    expect(error).toHaveProperty('message', '');
    expect(error).not.toHaveProperty('statusCode');
    expect(error).not.toHaveProperty('errors');
  });

  it('should call User.create once, with correct data', async () => {
    req.body = userObjectMockClientRequest;
    User.create.mockReturnValue(usersArrayMockDatabase[0]);

    let err;
    await UserControllers.createUser(req, res, (error) => {
      err = error;
    });

    expect.assertions(2);
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith(userObjectMockClientRequest);
  });

  it('should return status "201" and createdUser object to client without password - if everything working correctly', async () => {
    req.body = userObjectMockClientRequest;
    User.create.mockReturnValue(usersArrayMockDatabase[0]);

    let err;
    await UserControllers.createUser(req, res, (error) => {
      err = error;
    });

    expect.assertions(9);
    expect(res).toHaveProperty('statusCode', 201);
    const data = res._getJSONData();
    expect(data).toHaveProperty('createdUser');
    expect(data.createdUser).not.toHaveProperty('password');
    expect(data.createdUser).toHaveProperty('id', usersArrayMockDatabase[0].id);
    expect(data.createdUser).toHaveProperty(
      'firstName',
      userObjectMockClientRequest.firstName
    );
    expect(data.createdUser).toHaveProperty(
      'lastName',
      userObjectMockClientRequest.lastName
    );
    expect(data.createdUser).toHaveProperty(
      'email',
      userObjectMockClientRequest.email
    );
    expect(data.createdUser).toHaveProperty('createdAt');
    expect(data.createdUser).toHaveProperty('updatedAt');
  });
});
