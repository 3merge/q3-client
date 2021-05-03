/* eslint-disable global-require */
import Quill from 'quill';

describe('decorateImageAttributes', () => {
  it('should register image format', () => {
    const register = jest.spyOn(Quill, 'register');
    require('./ImageBlot.js');
    expect(register).toHaveBeenCalled();
  });

  it('should call inherited method for strings', () => {
    const stub = 'foo';

    expect(
      require('./ImageBlot.js').default.create(stub)
        .tagName,
    ).toMatch('IMG');
  });

  it('should not call inherited method', () => {
    const stub = { foo: 1 };

    expect(
      require('./ImageBlot.js').default.create(stub),
    ).toMatchObject(stub);
  });
});
