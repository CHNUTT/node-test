const HealthControllers = require('../../../src/controllers/health.controllers');
const httpMock = require('node-mocks-http');
const res = httpMock.createResponse();
const req = httpMock.createRequest();

describe('Check application health', () => {
  it('should be a function', () => {
    expect(typeof HealthControllers.getHealth).toBe('function');
  });

  it('should response with status 200 with appStatus ok', () => {
    HealthControllers.getHealth(req, res, () => {});

    expect.assertions(2)
    expect(res).toHaveProperty('statusCode', 200);
    const data = res._getJSONData();
    expect(data).toHaveProperty('appStatus', 'OK');
  });
});
