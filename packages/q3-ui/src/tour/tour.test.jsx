import { addToList } from '.';

describe('Tour', () => {
  describe('"addToList"', () => {
    it('should initial string', () => {
      expect(addToList(null, 'term')).toMatch('term');
    });

    it('should add to string with comma', () => {
      expect(addToList('inital', 'term')).toMatch(
        'inital,term',
      );
    });
  });
});
