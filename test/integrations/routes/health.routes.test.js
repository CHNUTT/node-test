const request = require('supertest');

describe('GET / - Check application health', () => {
  it('should be a function', async () => {
    const app = await require('../../../src/server')();
    const res = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect.assertions(2);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res.body).toHaveProperty('appStatus', 'OK');
  });
});
