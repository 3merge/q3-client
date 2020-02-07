import {
  renderTableCells,
  intersectWithKeys,
} from '../row';

describe('Row', () => {
  describe('"intersectWithKeys"', () => {
    it('should add keys to the object with undefined values', () => {
      const out = intersectWithKeys({ foo: 1 }, [
        'foo',
        'bar',
      ]);
      expect(out).toHaveProperty('foo');
      expect(out).toHaveProperty('bar');
    });
  });

  describe('"renderTableCells"', () => {
    it('should remove empty component if key values do not intersect', () => {
      const t = jest.fn();
      const out = renderTableCells(
        {
          foo: 1,
          bar: 1,
        },
        ['foo'],
        t,
      );

      expect(t).toHaveBeenCalled();
      expect(out).toHaveLength(1);
      expect(out[0].props).toMatchObject({
        children: 1,
      });
    });
  });
});
