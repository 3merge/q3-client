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

  describe('"strToBool"', () => {
    test.each([
      false,
      'false',
      null,
      undefined,
      0,
    ])('should return true', (v) =>
      expect(string.strToBool(v)).toBeFalsy(),
    );

    test.each([
      'FOO',
      true,
      'true',
      12,
    ])('should return false', (v) =>
      expect(string.strToBool(v)).toBeTruthy(),
    );
  });

  describe('"toTruthy"', () => {
    it('should run fn', () => {
      expect(
        string.toTruthy(true, (v) => String(v)),
      ).toMatch('yes');
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

  describe('"ellipsis"', () => {
    it('should cut off at the 3rd character', () => {
      expect(string.ellipsis('Hello World', 3)).toMatch(
        'Hel...',
      );
    });
  });

  describe('"toUppercase"', () => {
    it('should return empty string', () =>
      expect(string.toUpper(1)).toEqual(''));

    it('should return uppercase', () =>
      expect(string.toUpper('foo')).toEqual('FOO'));
  });

  describe('"toDate"', () => {
    it.skip('should return Shanghai time', () =>
      expect(
        // 'Asia/Shanghai'
        string.toDate('2020-09-10T13:18:51+08:00'),
      ).toMatch('Sep 11, 2020 1:18 AM'));

    it.skip('should return Australian time', () =>
      expect(
        // Europe/London
        string.toDate('2020-09-10T13:18:51+01:00'),
      ).toMatch('Sep 10, 2020 6:18 PM'));
  });
});
