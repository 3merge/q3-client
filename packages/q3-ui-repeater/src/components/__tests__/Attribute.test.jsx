import { getBoolIcon, getContent } from '../Attribute';

describe('Attribute', () => {
  describe('"getBoolIcon"', () => {
    it('should return outline', () => {
      expect(getBoolIcon(true).type.displayName).toMatch(
        'Outline',
      );
    });

    it('should return block', () => {
      expect(getBoolIcon(false).type.displayName).toMatch(
        'Block',
      );
    });
  });

  describe('"getBoolIcon"', () => {
    it('should return icon', () => {
      expect(getContent(true, 'checkbox')).toHaveProperty(
        'type',
      );
    });

    it('should two dashes', () => {
      expect(getContent()).toMatch('--');
    });

    it('should return date', () => {
      expect(getContent(new Date(), 'date')).toEqual(
        expect.any(String),
      );
    });

    it('should return text', () => {
      const foo = 'foo';
      expect(getContent(foo, 'text')).toMatch(foo);
    });
  });
});
