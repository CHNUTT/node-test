const { ROOTDIR } = require('../../../src/utils/rootDir');
const path = require('path');

describe('rootdir', () => {
  it('should return correct root directory of caller module', () => {
    const rootDir = ROOTDIR();
    expect(rootDir).toBe(__dirname);
  });
});
