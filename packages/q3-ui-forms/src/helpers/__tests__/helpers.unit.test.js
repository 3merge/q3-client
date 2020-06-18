import * as helpers from '..';

describe('Form helpers', () => {
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
});