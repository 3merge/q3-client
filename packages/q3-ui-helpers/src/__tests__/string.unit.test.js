import * as string from '../string';

describe('string', () => {
  describe('"castToLowercase"', () => {
    it('should cast and trim', () => {
      expect(string.castToLowercase('FO ')).toBe('fo');
    });
  });

  describe('"sanitizeArrayStrings"', () => {
    it('should exec castToLowercase', () => {
      expect(
        string.sanitizeAll(['FOO', 'BARR', null]),
      ).toEqual(['foo', 'barr']);
    });
  });

  describe('"transformDelineatedStringIntoArray"', () => {
    expect(
      string.transformDelineatedStringIntoArray('Foo, Bar'),
    ).toEqual(['foo', 'bar']);
  });

  describe('"transformArrayIntoDelineatedString"', () => {
    expect(
      string.transformArrayIntoDelineatedString([
        'foo',
        'bar',
      ]),
    ).toEqual('foo, bar');
  });
});
