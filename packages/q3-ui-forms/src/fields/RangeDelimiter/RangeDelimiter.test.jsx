import { generateSharedProps } from './RangeDelimiter';

describe('RangeDelimiter', () => {
  describe('"generateSharedProps"', () => {
    it('should return a plain, redacted object', () => {
      const out = generateSharedProps({
        build: jest.fn(),
        id: 1,
      });

      expect(out).not.toHaveProperty('build');
      expect(out).not.toHaveProperty('id');
    });
  });
});
