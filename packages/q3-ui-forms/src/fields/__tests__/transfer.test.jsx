import { getInactiveItems } from '../transfer';

describe('Transfer', () => {
  describe('"filterActiveItems"', () => {
    it('should remove matching items', () => {
      expect(
        getInactiveItems(['ab', 'cd', 'ef'], ['a*', 'ef']),
      ).toEqual(['cd']);
    });
  });
});
