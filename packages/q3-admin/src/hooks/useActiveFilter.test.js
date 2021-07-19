import {
  getCustomFilters,
  getActiveSearchQueryByKey,
} from './useActiveFilter';

describe('useActiveFilter', () => {
  describe('"getCustomFilters"', () => {
    it('should ignore global query words', () => {
      expect(
        getCustomFilters(
          '?search=foo&status=Quote&sort-createdAt&payment=None+Yet',
        ),
      ).toEqual([
        'search=foo',
        'status=Quote',
        'payment=None+Yet',
      ]);
    });
  });

  describe('"getActiveSearchQueryByKey"', () => {
    it('should compare strings', () => {
      expect(
        getActiveSearchQueryByKey(
          '?search=foo&status=Quote&sort-createdAt&payment=None%20Yet',
        )({
          foo: '?payment=Done',
          bar: 'payment=None%20Yet',
        }),
      ).toMatch('bar');
    });

    it('should choose the longest match', () => {
      expect(
        getActiveSearchQueryByKey(
          '?search=foo&status=Quote&total%3E=100&sort=-createdAt&payment=None%20Yet&currency=CAD',
        )({
          foo:
            '?payment=None%20Yet&currency=CAD&total%3E=100',
          bar: 'payment=None%20Yet&currency=CAD',
          quuz: 'currency=CAD',
        }),
      ).toMatch('foo');
    });
  });
});
