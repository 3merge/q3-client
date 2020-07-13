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

  describe('shuffle', () => {
    it('should  filter and merge two arrays', () => {
      expect(
        array.shuffle(
          ['foo', 'bar'],
          ['hello', 'dolly'],
          ['foo', 'hello'],
        ),
      ).toEqual([
        ['bar', 'hello'],
        ['dolly', 'foo'],
      ]);
    });
  });

  describe('matchOnSome', () => {
    it('should return truthy', () => {
      expect(
        array.matchOnSome(['ab*', 'cd'], 'ab'),
      ).toBeTruthy();
    });

    it('should return falsy', () => {
      expect(
        array.matchOnSome(['ab*', 'cd'], 'ef'),
      ).toBeFalsy();
    });
  });

  describe('mergeUnique', () => {
    it('should drop duplicates', () => {
      expect(
        array.mergeUnique(
          ['foo', 'bar', 'foo', 'bar'],
          ['foo', 'quuz'],
        ),
      ).toEqual(['foo', 'bar', 'quuz']);
    });
  });

  describe('sortByIndexingArray', () => {
    it('should prioritize active columns', () => {
      expect(
        array.sortByIndexingArray(
          ['foo', 'bar', 'thux', 'garply', 'quuz'],
          ['bar', 'quuz'],
        ),
      ).toEqual(['bar', 'quuz', 'foo', 'garply', 'thux']);
    });
  });

  describe('intersect', () => {
    it('should match nested array keys', () => {
      expect(
        array.intersects(
          ['foo', 'bar', 'foo.0.bar', 'foo.1.bar'],
          ['foo.$.bar'],
        ),
      ).toHaveLength(2);
    });
  });
});
