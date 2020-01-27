import * as utils from '../helpers';

describe('data tables Utils', () => {
  describe('"hasKeys"', () => {
    it('should return falsy without an object', () =>
      expect(utils.hasKeys()).toBeFalsy());

    it('should return falsy with empty object', () =>
      expect(utils.hasKeys({})).toBeFalsy());
  });

  describe('"ellpisis"', () => {
    it('return full string', () =>
      expect(
        utils.ellpisis('abc', 5),
      ).toMatch('abc'));

  it('return partial string', () =>
      expect(
        utils.ellpisis('abcdef', 3),
      ).toMatch('abc...'));
  });

  describe('extractKeys', () => {
    it('return empty array', () => {
      expect(utils.extractKeys()).toEqual([]);
    });
  })

  describe('extractIds', () => {
    it('return empty array', () => {
      expect(utils.extractIds()).toEqual([]);
    });
  })
});

