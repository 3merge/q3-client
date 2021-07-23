import { getCustomFilters } from './useActiveFilter';

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
});
