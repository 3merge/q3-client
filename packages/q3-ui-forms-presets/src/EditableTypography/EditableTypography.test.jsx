import React from 'react';
import Edit from '@material-ui/icons/Edit';
import EditableTypography, {
  formatText,
} from './EditableTypography';

jest.mock('useful-state', () => ({
  useToggle: jest.fn().mockReturnValue({
    state: false,
    open: jest.fn(),
    close: jest.fn(),
  }),
}));

const getGeneralProps = () => ({
  initialValues: { foo: 'bar' },
  data: { id: 1 },
  onSubmit: jest.fn(),
});

describe('EditableTypography', () => {
  it('should call on renderer function', () => {
    const renderer = jest.fn();
    global.shallow(
      <EditableTypography
        isEditable
        renderer={renderer}
        {...getGeneralProps()}
      >
        Text
      </EditableTypography>,
    );

    expect(renderer).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object),
      expect.any(Function),
    );
  });

  it('should render edit icon', () => {
    const icon = global
      .shallow(
        <EditableTypography
          isEditable
          {...getGeneralProps()}
        >
          Text
        </EditableTypography>,
      )
      .find(Edit);

    expect(icon).toHaveLength(1);
  });

  describe('"formatText"', () => {
    it('should return a number', () => {
      expect(formatText('12.12', 'number')).toBe(12.12);
      expect(formatText('string', 'number')).toMatch('--');
    });

    it('should return a date', () => {
      expect(formatText('2020-12-12', 'date')).toMatch(
        'December',
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
