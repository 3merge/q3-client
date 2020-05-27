import * as casters from '../casters';

describe('casters', () => {
  describe('castToUTC', () => {
    it('should return empty', () => {
      expect(casters.castToUTC('')).toEqual('');
    });

    it('should return empty', () => {
      expect(casters.castToUTC('2015-12-12')).toMatch(
        '2015-12-12T',
      );
    });
  });

  describe('castToBoolean', () => {
    it('should convert to truthy', () => {
      expect(casters.castToBoolean(true)).toEqual('true');
      expect(casters.castToBoolean('true')).toEqual('true');
      expect(casters.castToBoolean('value')).toEqual(
        'true',
      );
      expect(casters.castToBoolean(1)).toEqual('true');
    });

    it('should convert to falsy', () => {
      expect(casters.castToBoolean(false)).toEqual('false');
      expect(casters.castToBoolean(null)).toEqual('false');
      expect(casters.castToBoolean('false')).toEqual(
        'false',
      );
      expect(casters.castToBoolean(0)).toEqual('false');
      expect(casters.castToBoolean(undefined)).toEqual(
        'false',
      );
    });
  });
});
