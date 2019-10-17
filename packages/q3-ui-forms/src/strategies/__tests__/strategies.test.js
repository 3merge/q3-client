import validateStrategy from '..';

describe('validateStrategy', () => {
  it('should throw an error without a match', () => {
    expect(() => validateStrategy('foo')).toThrowError();
  });

  it('should return strategy', () => {
    expect(validateStrategy('formik')).toMatchObject({
      onComplete: expect.any(Function),
      onStart: expect.any(Function),
    });
  });
});
