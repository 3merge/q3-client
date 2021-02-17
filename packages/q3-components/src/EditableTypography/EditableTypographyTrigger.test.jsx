import { formatText } from './EditableTypographyTrigger';

jest.mock('useful-state', () => ({
  useToggle: jest.fn().mockReturnValue({
    state: false,
    open: jest.fn(),
    close: jest.fn(),
  }),
}));

describe('EditableTypography', () => {
  describe('"formatText"', () => {
    it('should return a number', () => {
      expect(formatText('12.12', { type: 'number' })).toBe(
        12.12,
      );
      expect(
        formatText('string', { type: 'number' }),
      ).toMatch('--');
    });

    it('should return a date', () => {
      expect(
        formatText('2020-12-12', { type: 'date' }),
      ).toMatch('Dec');
      expect(
        formatText('not-a-date', { type: 'date' }),
      ).toMatch('--');
    });

    it('should return Yes', () => {
      expect(
        formatText(true, { type: 'checkbox' }),
      ).toMatch('yes');
    });
  });
});
