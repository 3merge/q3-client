import * as helpers from '..';

describe('Form helpers', () => {
  describe('addTime', () => {
    it('should return data as is', () => {
      expect(helpers.addTime({})(null)).toBeNull();
    });

    it('should return time when possible', () => {
      expect(typeof helpers.addTime({})(new Date())).toBe(
        'string',
      );
    });
  });

  describe('asOptions', () => {
    it('should convert simple array into multi-dimensional', () =>
      expect(helpers.asOptions(['foo'])).toEqual([
        { value: 'foo', label: 'foo' },
      ]));
  });

  describe('castToUTC', () => {
    it('should return empty', () => {
      expect(helpers.castToUTC('')).toEqual('');
    });

    it('should return empty', () => {
      expect(helpers.castToUTC('2015-12-12')).toMatch(
        '2015-12-12T',
      );
    });
  });

  describe('castToBoolean', () => {
    it('should convert to truthy', () => {
      expect(helpers.castToBoolean(true)).toEqual('true');
      expect(helpers.castToBoolean('true')).toEqual('true');
      expect(helpers.castToBoolean('value')).toEqual(
        'true',
      );
      expect(helpers.castToBoolean(1)).toEqual('true');
    });

    it('should convert to falsy', () => {
      expect(helpers.castToBoolean(false)).toEqual('false');
      expect(helpers.castToBoolean(null)).toEqual('false');
      expect(helpers.castToBoolean('false')).toEqual(
        'false',
      );
      expect(helpers.castToBoolean(0)).toEqual('false');
      expect(helpers.castToBoolean(undefined)).toEqual(
        'false',
      );
    });
  });

  describe('castToSimpleArray', () => {
    it('should return empty array', () =>
      expect(helpers.castToSimpleArray(true)).toEqual([]));

    it('should return flattened array', () =>
      expect(
        helpers.castToSimpleArray([
          'one',
          { value: 'two' },
          'two',
        ]),
      ).toEqual(['one', 'two']));
  });

  describe('"convertFromRegexPattern"', () => {
    it('should strip out regex pattern', () =>
      expect(
        helpers.convertFromRegexPattern('/foo/gi'),
      ).toEqual('foo'));

    it('should strip out regex pattern to all parameters', () =>
      expect(
        helpers.convertFromRegexPattern(['/foo/gi']),
      ).toEqual(['foo']));
  });

  describe('"castToRegex"', () => {
    it('should add regex pattern', () =>
      expect(helpers.castToRegex('foo')).toEqual(
        '/foo/gi',
      ));

    it('should add regex pattern to all parameters', () =>
      expect(helpers.castToRegex(['foo'])).toEqual([
        '/foo/gi',
      ]));
  });
});
