import { filterByComparison } from '../helpers';

describe('Detail container', () => {
  describe('"filterByComparison"', () => {
    it('should filter by conditions not satisfied by state', () => {
      const a = [
        { props: { conditional: ['foo=bar'] } },
        { props: { conditional: ['foo=quuz'] } },
      ];
      const out = filterByComparison(a, { foo: 'bar' });
      expect(out).toHaveLength(1);
    });
  });
});
