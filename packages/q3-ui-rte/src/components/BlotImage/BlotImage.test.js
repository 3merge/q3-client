/* eslint-disable global-require */

describe('decorateImageAttributes', () => {
  it('should call inherited method for strings', () => {
    const stub = 'foo';

    expect(
      require('./BlotImage.js').default.create(stub)
        .tagName,
    ).toMatch('IMG');
  });

  it('should not call inherited method', () => {
    const stub = { foo: 1 };

    expect(
      require('./BlotImage.js').default.create(stub),
    ).toMatchObject(stub);
  });
});
