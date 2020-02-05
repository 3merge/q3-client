import { renderTableCells } from '../row';

describe('Row', () => {
  describe('"renderTableCells"', () => {
    it('should filter nullish and non-intersecting values', () => {
      const t = jest.fn();
      const out = renderTableCells(
        {
          foo: 1,
          bar: 1,
          quux: 1,
        },
        ['foo', 'bar'],
        t,
      );

      expect(out).toHaveLength(2);
      expect(t).toHaveBeenCalled();
    });
  });
});
