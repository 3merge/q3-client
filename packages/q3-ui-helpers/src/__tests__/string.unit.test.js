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

  describe('"toTruthy"', () => {
    test.each([
      false,
      'false',
      null,
      undefined,
      0,
    ])('should return NO', (v) =>
      expect(string.toTruthy(v)).toMatch('NO'),
    );

    test.each([
      'FOO',
      true,
      'true',
      12,
    ])('should return YES', (v) =>
      expect(string.toTruthy(v)).toMatch('YES'),
    );

    it('should run fn', () => {
      expect(
        string.toTruthy(true, (v) => String(v)),
      ).toMatch('YES');
    });
  });

  describe('"toPrice"', () => {
    it('should return fixed price', () => {
      expect(string.toPrice(12.991)).toMatch('$12.99');
    });

    it('should convert string', () => {
      expect(string.toPrice('9.87')).toMatch('$9.87');
    });

    it('should return 0', () => {
      expect(string.toPrice('hey')).toMatch('$0');
    });
  });
});
