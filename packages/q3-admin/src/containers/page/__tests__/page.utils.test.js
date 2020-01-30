import { slugify, invokeFnWithCallback } from '../utils';

describe('"Page utility functions"', () => {
  describe('"slugify"', () => {
    it('should prefix with opening slash', () =>
      expect(slugify('foo')).toMatch('/foo'));

    it('should include id', () =>
      expect(slugify('foo', '1')).toMatch('/foo/1'));
  });

  describe('"invokeFnWithCallback"', () => {
    it('should do nothing', () =>
      expect(invokeFnWithCallback()).toBeUndefined());

    it('should invoke function', (done) => {
      const fn = jest.fn();
      invokeFnWithCallback(fn, 1, () => {
        expect(fn).toHaveBeenCalledWith(1);
        done();
      });
    });

    it('should invoke async function', (done) => {
      const fn = jest.fn().mockResolvedValue(2);
      invokeFnWithCallback(fn, null, (v) => {
        expect(v).toBe(2);
        done();
      });
    });
  });
});
