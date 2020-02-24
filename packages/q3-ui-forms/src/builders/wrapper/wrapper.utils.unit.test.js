import { selectivelyKeepInitialValues } from './utils';

describe('Wrapper utils', () => {
  describe('"selectivelyKeepInitialValues"', () => {
    it('should execute lodash pick if given values to keep', () => {
      const values = selectivelyKeepInitialValues(
        { foo: 1, bar: 1, quuz: 1 },
        ['foo', 'bar'],
      );

      expect(values).toHaveProperty('foo');
      expect(values).toHaveProperty('bar');
      expect(values).not.toHaveProperty('quuz');
    });

    it('should skip lodash pick', () => {
      const values = selectivelyKeepInitialValues({
        foo: 1,
        bar: 1,
        quuz: 1,
      });

      expect(Object.keys(values)).toHaveLength(3);
    });
  });
});
