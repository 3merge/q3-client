import React from 'react';
import { useToggle } from 'useful-state';
import { EditableTypography } from 'q3-ui-forms-presets';
import EditableTypographyWrapper from './EditableTypography';

jest.mock('q3-ui-forms-presets', () => ({
  EditableTypography: jest
    .fn()
    .mockImplementation(() => null),
}));

jest.mock('./useStyle', () =>
  jest.fn().mockReturnValue({}),
);

jest.mock('useful-state', () => ({
  useToggle: jest.fn(),
}));

let context;

beforeEach(() => {
  context = jest.spyOn(React, 'useContext');
});

const getTypographyEl = (props) =>
  global.shallow(
    <EditableTypographyWrapper
      editable={{
        renderer: jest.fn(),
      }}
      data={{ id: '1' }}
      name="name"
      {...props}
    >
      <div />
    </EditableTypographyWrapper>,
  );

describe('EditableTypography', () => {
  it('should return "--" without the proper permissions', () => {
    context.mockReturnValue({
      auth: {
        canSeeSub: jest.fn().mockReturnValue(false),
      },
    });

    expect(getTypographyEl().text()).toMatch('--');
  });

  it('should mark as isEditable false', () => {
    context.mockReturnValue({
      auth: {
        canSeeSub: jest.fn().mockReturnValue(true),
      },
    });

    expect(
      getTypographyEl()
        .find(EditableTypography)
        .props(),
    ).toHaveProperty('isEditable', false);
  });

  it('should mark as isEditable true', () => {
    context.mockReturnValue({
      edit: jest.fn(),
      auth: {
        canSeeSub: jest.fn().mockReturnValue(true),
        canEditSub: jest.fn().mockReturnValue(true),
      },
    });

    const el = getTypographyEl({
      editable: {
        name: { foo: 1 },
      },
    })
      .find(EditableTypography)
      .props();

    expect(el).toHaveProperty('isEditable', true);
  });
});
