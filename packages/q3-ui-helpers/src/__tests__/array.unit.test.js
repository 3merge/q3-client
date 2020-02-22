import * as array from '../array';

describe('Props', () => {
  describe('"hasIndex"', () => {
    it('should return truthy', () =>
      expect(array.hasIndex(2)).toBeTruthy());

    it('should return falsey', () =>
      expect(array.hasIndex(-1)).toBeFalsy());
  });

  describe('"is"', () => {
    it('should return an array', () =>
      expect(array.is(1)).toEqual([1]));

    it('should return self', () =>
      expect(array.is([1])).toEqual([1]));
  });

  describe('"castString"', () => {
    it('should return self', () =>
      expect(array.castString([1])).toEqual([1]));

    it('should return self', () =>
      expect(array.castString('hello, world')).toEqual([
        'hello',
        'world',
      ]));
  });
});
