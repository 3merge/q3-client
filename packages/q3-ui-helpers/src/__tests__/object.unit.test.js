import { hasKeys } from '../object';

describe('Object helpers', () => {
  describe('"hasKeys"', () => {
    it('should return truthy', () => {
      expect(hasKeys({ foo: 1 })).toBeTruthy();
    });

    it('should return falsy', () => {
      expect(hasKeys({})).toBeFalsy();
      expect(hasKeys(null)).toBeFalsy();
      expect(hasKeys()).toBeFalsy();
    });
  });
});
