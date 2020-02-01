import PathBuilder from '../utils';

describe('"PathBuilder"', () => {
  describe('split', () => {
    it('should filter out locale paths', () => {
      const a = PathBuilder.split('/en-CA/split/me/up');
      expect(a).not.toContain('en-ca');
    });

    it('should convert string into array', () => {
      const a = PathBuilder.split('/split/me/up/');
      expect(a).toHaveLength(3);
    });
  });

  describe('"append"', () => {
    it('should add prefixed string to path', () => {
      expect(new PathBuilder().append('foo')).toEqual(
        '/foo',
      );
    });
  });
});
