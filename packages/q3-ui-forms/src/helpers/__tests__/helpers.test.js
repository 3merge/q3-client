import * as helpers from '..';

describe('Form helpers', () => {
  describe('asOptions', () => {
    it('should convert simple array into multi-dimensional', () =>
      expect(helpers.asOptions(['foo'])).toEqual([
        { value: 'foo', label: 'foo' },
      ]));
  });

  describe('isArray', () => {
    it('should return truthy', () =>
      expect(helpers.isArray(['foo'])).toBeTruthy());

    it('should return falsy', () =>
      expect(helpers.isArray([])).toBeFalsy());
  });

  describe('isObject', () => {
    it('should return truthy', () =>
      expect(helpers.isObject({ key: 1 })).toBeTruthy());

    it('should return falsy', () =>
      expect(helpers.isObject([])).toBeFalsy());
  });

  describe('assignIDs', () => {
    it('should map index to key', () =>
      expect(
        helpers.assignIDs([{ value: 1 }, { value: 2 }]),
      ).toEqual([
        { id: 0, value: 1 },
        { id: 1, value: 2 },
      ]));

    it('should preserve id', () =>
      expect(
        helpers.assignIDs([
          { value: 1, id: 12 },
          { value: 2 },
        ]),
      ).toEqual([
        { id: 12, value: 1 },
        { id: 1, value: 2 },
      ]));

    it('should use prop as map guide', () =>
      expect(
        helpers.assignIDs(
          [{ value: 1, id: 12 }, { value: 2 }],
          'value',
        ),
      ).toEqual([
        { id: 1, value: 1 },
        { id: 2, value: 2 },
      ]));
  });
});
