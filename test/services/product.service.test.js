const add = require('../../src/services/calculation/add');

describe('add function', () => {
  it('should return sum of 2 numbers', () => {
    expect(add(10, 20)).toEqual(30);
    expect(add(123.44, 11.23459)).toEqual(134.67459);
  });
});
