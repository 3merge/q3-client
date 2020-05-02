const path = require('path');
const loadContent = require('../loadContent');

describe('loadContent', () => {
  it('should fetch all content from directory', () => {
    const out = loadContent(
      path.resolve(__dirname, '../../__fixtures__'),
    );

    expect(out).toHaveProperty('en');
    expect(out).toHaveProperty('fr');
  });
});
