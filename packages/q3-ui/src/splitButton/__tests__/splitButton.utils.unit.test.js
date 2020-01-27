import { invokeHandlerByIndex } from '../utils';

describe('SplitButton utilities', () => {
  describe('invokeHandlerByIndex', () => {
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
});
