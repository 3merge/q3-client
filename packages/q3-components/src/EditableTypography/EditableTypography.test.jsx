import React from 'react';
import EditableTypography from './EditableTypography';

jest.mock('useful-state', () => ({
  useToggle: jest.fn().mockReturnValue({
    state: false,
    open: jest.fn(),
    close: jest.fn(),
  }),
}));

const getGeneralProps = () => ({
  initialValues: { foo: 'bar' },
  onSubmit: jest.fn(),
  fieldProps: {
    type: 'text',
    name: 'foo',
  },
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
      expect.any(Function),
    );
  });

  it('should render edit icon', () => {
    const trigger = global
      .shallow(
        <EditableTypography
          isEditable
          {...getGeneralProps()}
        >
          Text
        </EditableTypography>,
      )
      .props()
      .buttonComponent(jest.fn(), true);

    expect(trigger.type.name).toMatch(
      'EditableTypographyTrigger',
    );

    expect(trigger.props).toHaveProperty('isOpen', true);
    expect(trigger.props).toHaveProperty(
      'open',
      expect.any(Function),
    );
  });
});
