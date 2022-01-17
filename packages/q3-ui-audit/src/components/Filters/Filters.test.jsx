import { toTargets } from './Filters';

describe('Filters', () => {
  describe('toTargets', () => {
    it('should return as-is', () => {
      expect(toTargets([1, 2])).toEqual([1, 2]);
    });

    it('should return as arrray', () => {
      expect(toTargets('1,2')).toEqual(['1', '2']);
    });
  });
});
