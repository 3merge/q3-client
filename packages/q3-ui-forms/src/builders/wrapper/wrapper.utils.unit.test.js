import {
  selectivelyKeepInitialValues,
  orTruthy,
  getInitialStatus,
  STATUS_INITIALIZING,
  STATUS_READY,
} from './utils';

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

  describe('"orTruthy"', () => {
    it('should return true by default', () => {
      expect(orTruthy()).toBeTruthy();
    });

    it('should return second param', () => {
      expect(orTruthy(false, true)).toBeTruthy();
    });
  });

  describe('"getInitialStatus"', () => {
    it('should return initializing', () => {
      expect(getInitialStatus()).toMatch(
        STATUS_INITIALIZING,
      );
    });

    it('should return ready', () => {
      expect(getInitialStatus(true, null)).toMatch(
        STATUS_READY,
      );
    });

    it('should return initializing', () => {
      const o = 'override';
      expect(getInitialStatus(true, o)).toMatch(o);
    });
  });
});
