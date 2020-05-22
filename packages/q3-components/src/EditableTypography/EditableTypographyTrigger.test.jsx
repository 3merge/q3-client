import React from 'react';
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
      expect(formatText('12.12', 'number')).toBe(12.12);
      expect(formatText('string', 'number')).toMatch('--');
    });

    it('should return a date', () => {
      expect(formatText('2020-12-12', 'date')).toMatch(
        'Dec',
      );
      expect(formatText('not-a-date', 'date')).toMatch(
        '--',
      );
    });

    it('should return Yes', () => {
      expect(formatText(true, 'checkbox')).toMatch('YES');
    });
  });
});
