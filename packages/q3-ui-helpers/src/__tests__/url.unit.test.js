import * as url from '../url';

describe('URL', () => {
  describe('"checksArray"', () => {
    it('should convert into length statement', () => {
      expect(url.checksArray('hello.0')).toMatch(
        'hello%2Elength',
      );
    });
  });

  describe('"decode"', () => {
    it('should replace special codes', () => {
      expect(url.decode('%2Elength%21')).toMatch('.0!');
    });
  });

  describe('"encode"', () => {
    it('should replace special codes', () => {
      expect(url.encode('.0!')).toMatch('%2Elength%21');
    });
  });

  describe('"getYoutube"', () => {
    it('should generate img preview', () => {
      const { thumbnail, embed } = url.getYoutube(
        'https://www.youtube.com/watch?v=4ctK1aoWuqY',
      );

      expect(thumbnail).toMatch('img.youtube');
      expect(thumbnail).toMatch('4ctK1aoWuqY');
      expect(embed).toMatch('4ctK1aoWuqY');
      expect(embed).toMatch('embed');
    });
  });
});
