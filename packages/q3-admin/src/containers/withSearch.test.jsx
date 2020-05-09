import {
  matchTerms,
  getCustomFilters,
  getActiveSearchQueryByKey,
} from './withSearch';

describe('withSearch', () => {
  describe('"getCustomFilters"', () => {
    it('should ignore global query words', () => {
      expect(
        getCustomFilters(
          '?search=foo&status=Quote&sort-createdAt&payment=None+Yet',
        ),
      ).toEqual(['status=Quote', 'payment=None+Yet']);
    });
  });

  describe('"getActiveSearchQueryByKey"', () => {
    it('should compare strings', () => {
      expect(
        getActiveSearchQueryByKey(
          '?search=foo&status=Quote&sort-createdAt&payment=None+Yet',
        )({
          foo: '?payment=Done',
          bar: 'payment=None Yet',
        }),
      ).toMatch('bar');
    });

    it('should choose the longest match', () => {
      expect(
        getActiveSearchQueryByKey(
          '?search=foo&status=Quote&total%3E=100&sort-createdAt&payment=None+Yet&currency=CAD',
        )({
          foo: '?payment=None Yet&currency=CAD&total>=100',
          bar: 'payment=None Yet&currency=CAD',
          quuz: 'currency=CAD',
        }),
      ).toMatch('foo');
    });
  });

  describe('"matchTerms"', () => {
    it('should match either as decoded or encoded', () => {
      expect(
        matchTerms('payment=None+Yet', 'payment=None Yet'),
      ).toBeTruthy();

      expect(
        matchTerms('total%3E=100', 'total>=100'),
      ).toBeTruthy();
    });
  });
});
