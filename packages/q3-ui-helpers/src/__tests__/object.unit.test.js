import {
  clean,
  hasKeys,
  invokeSafely,
  removeUndefinedValuesFromAllArrays,
  isFn,
} from '../object';

describe('Object helpers', () => {
  describe('"hasKeys"', () => {
    it('should return truthy', () => {
      expect(hasKeys({ foo: 1 })).toBeTruthy();
    });

    it('should return falsy', () => {
      expect(hasKeys({})).toBeFalsy();
      expect(hasKeys(null)).toBeFalsy();
      expect(hasKeys()).toBeFalsy();
    });
  });

  describe('"invokeSafely"', () => {
    it('should call function', () => {
      const fn = jest.fn();
      invokeSafely(fn);
      expect(fn).toHaveBeenCalled();
    });

    it('should do nothing', () => {
      expect(invokeSafely('Noop')).toBeNull();
    });
  });

  describe('"isFn"', () => {
    it('should return truthy', () => {
      expect(isFn(jest.fn())).toBeTruthy();
    });
  });

  describe('"clean', () => {
    it('should delete nullish keys', () => {
      expect(
        clean({
          foo: undefined,
          bar: {
            baz: null,
          },
        }),
      ).toEqual({});
    });

    it('should delete empty arrays', () => {
      expect(
        clean({
          foo: [{}, undefined],
        }),
      ).toEqual({});
    });

    it('should retain values', () => {
      const out = clean({
        foo: 1,
        bar: '',
      });

      expect(out).toHaveProperty('foo');
      expect(out).toHaveProperty('bar');
    });
  });

  describe('"removeUndefinedValuesFromAllArrays"', () => {
    it('should remove all empty array values', () => {
      const out = removeUndefinedValuesFromAllArrays({
        foo: [undefined, 1, '', 3],
        bar: [
          {
            quuz: [1, undefined, 2],
          },
          undefined,
        ],
      });

      expect(out.foo).toHaveLength(3);
      expect(out.bar).toHaveLength(1);
      expect(out.bar[0].quuz).toHaveLength(2);
    });
  });
});
