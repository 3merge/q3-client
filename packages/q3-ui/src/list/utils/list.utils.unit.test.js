import * as utils from '.';

describe('List Utils', () => {
  describe('"formatArrayAsCommaDelineatedString"', () => {
    it('should return a string untouched', () => {
      const stub = 'This is a basic string';
      expect(
        utils.formatArrayAsCommaDelineatedString(stub),
      ).toMatch(stub);
    });

    it('should breakup an array by comma', () =>
      expect(
        utils.formatArrayAsCommaDelineatedString([
          'This',
          'is ',
          'not',
          '  a',
          'basic',
          'string  ',
        ]),
      ).toMatch('This, is, not, a, basic, string'));

    it('return "--" on unexpected input', () =>
      expect(
        utils.formatArrayAsCommaDelineatedString({}),
      ).toMatch('--'));

    it('return "--" on empty input', () =>
      expect(
        utils.formatArrayAsCommaDelineatedString(''),
      ).toMatch('--'));
  });

  describe('"hasLength"', () => {
    it('should return falsy without an array', () =>
      expect(utils.hasLength({})).toBeFalsy());

    it('should return falsy with empty array', () =>
      expect(utils.hasLength([])).toBeFalsy());

    it('should return truthy with populated array', () =>
      expect(utils.hasLength([1, 2, 3])).toBeTruthy());
  });
});
