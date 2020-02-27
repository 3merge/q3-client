import { castToBoolean, fallbackToEmptyString } from '.';

describe('Checkbox utils', () => {
  describe('"fallbackToEmptyString"', () => {
    it('should return truthy', () => {
      const all = ['true', true, '*'].every(castToBoolean);
      expect(all).toBeTruthy();
    });

    it('should return falsy', () => {
      const all = ['false', false].every(
        (v) => !castToBoolean(v),
      );
      expect(all).toBeTruthy();
    });
  });

  describe('"fallbackToEmptyString"', () => {
    it('should return empty string', () => {
      expect(fallbackToEmptyString(true)).toMatch('');
    });

    it('should return truthy if second parameter defined', () => {
      expect(
        fallbackToEmptyString(true, 'foo'),
      ).toBeTruthy();
    });

    it('should return truthy if second parameter defined', () => {
      expect(fallbackToEmptyString(false, 'foo')).toMatch(
        'foo',
      );
    });
  });
});
