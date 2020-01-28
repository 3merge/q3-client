import {
  invokeHandlerByIndex,
  setActiveIndex,
  getLabelByIndex,
  getDescriptionByIndex,
} from '../utils';

describe('SplitButton utilities', () => {
  describe('"invokeHandlerByIndex"', () => {
    it('should call handler fn', () => {
      const handler = jest.fn();
      const curried = invokeHandlerByIndex(
        [null, { handler }],
        1,
      );

      curried();
      expect(handler).toHaveBeenCalled();
    });

    it('should return null in handler fn does not exist', () => {
      const curried = invokeHandlerByIndex([{}], 0);
      expect(curried()).toBeNull();
    });

    it('should return null in opts is not an object', () => {
      const curried = invokeHandlerByIndex([null], 0);
      expect(curried()).toBeNull();
    });
  });

  describe('"setActiveIndex"', () => {
    it('should register onClick fn', () => {
      const a = setActiveIndex(
        [{}, null, undefined],
        jest.fn(),
        1,
      );

      expect(a[0]).toHaveProperty(
        'onClick',
        expect.any(Function),
      );
    });
  });

  describe('"get~Prop~ByIndex" helpers', () => {
    it('should return label', () =>
      expect(
        getLabelByIndex([null, null, { label: 'foo' }], 2),
      ).toMatch('foo'));

    it('should return description', () =>
      expect(
        getDescriptionByIndex(
          [null, null, { description: 'foo' }],
          2,
        ),
      ).toMatch('foo'));

    it('should return undefined', () =>
      expect(getDescriptionByIndex([], 1)).toBeUndefined());
  });
});
