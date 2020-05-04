import React from 'react';
import EditableTypographyFormField, {
  isCheckbox,
} from './EditableTypographyFormField';

jest.mock('useful-state', () => ({
  useToggle: jest.fn().mockReturnValue({
    state: false,
    open: jest.fn(),
    close: jest.fn(),
  }),
}));

describe('EditableTypographyFormField', () => {
  describe('"isCheckbox"', () => {
    it('should return boolean', () => {
      expect(isCheckbox('checkbox')).toBeTruthy();
      expect(isCheckbox('text')).toBeFalsy();
    });
  });

  describe('"isCheckbox"', () => {
    it('should assign label', () => {
      const el = global
        .shallow(
          <EditableTypographyFormField
            type="checkbox"
            name="foo"
          />,
        )
        .props();

      expect(el).toHaveProperty('label', 'enabled');
      expect(el).toHaveProperty('suppressLabel', false);
    });

    it('should not assign label', () => {
      const el = global
        .shallow(
          <EditableTypographyFormField
            type="text"
            name="foo"
          />,
        )
        .props();

      expect(el).toHaveProperty('label', '');
      expect(el).toHaveProperty('suppressLabel', true);
    });
  });
});
