import { getActions } from '../utils';

describe('List utils', () => {
  describe('"getActions"', () => {
    it('should not add to output', () => {
      expect(getActions('foo')).toHaveLength(1);
    });

    it('should not add to output', () => {
      expect(getActions('foo', jest.fn())).toHaveLength(2);
    });
  });
});
