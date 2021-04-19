const { ROOTDIR } = require('../../../src/utils/rootDir');

describe('rootdir', () => {
  it('should return correct root directory of caller module', () => {
    const rootDir = ROOTDIR();
    expect(rootDir).toBe('/app/test/units/utils');
  });
});
