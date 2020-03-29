import React from 'react';
import { useToggle } from 'useful-state';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import EditableTypography from './EditableTypography';

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

describe('EditableTypography', () => {
  it('should return "--" without the proper permissions', () => {
    useToggle.mockReturnValue({});

    context.mockReturnValue({
      auth: {
        canSeeSub: jest.fn().mockReturnValue(false),
      },
    });

    const el = global
      .shallow(
        <EditableTypography data={{ id: '1' }} name="name">
          <div />
        </EditableTypography>,
      )
      .text();

    expect(el).toMatch('--');
  });

  it('should return editable typography', () => {
    const edit = jest.fn();
    useToggle.mockReturnValue({});

    context.mockReturnValue({
      auth: {
        canSeeSub: jest.fn().mockReturnValue(true),
        canEditSub: jest.fn().mockReturnValue(true),
      },
      edit,
    });

    const el = global.shallow(
      <EditableTypography
        data={{ id: '1' }}
        name="name"
        editable={{ type: 'text', name: 'name' }}
      >
        Value
      </EditableTypography>,
    );

    const props = el.find(Typography).props();
    const icon = el.find(Edit).length;

    expect(props).toHaveProperty('tabIndex', 0);
    expect(props).toHaveProperty('style.cursor', 'pointer');
    expect(icon).toBe(1);
  });

  it('should return non-editable typography', () => {
    useToggle.mockReturnValue({});

    context.mockReturnValue({
      auth: {
        canSeeSub: jest.fn().mockReturnValue(true),
        canEditSub: jest.fn().mockReturnValue(true),
      },
    });

    const el = global.shallow(
      <EditableTypography data={{ id: '1' }} name="name">
        Value
      </EditableTypography>,
    );

    const props = el.find(Typography).props();
    const icon = el.find(Edit).length;

    expect(props).toHaveProperty(
      'style.cursor',
      'not-allowed',
    );

    expect(icon).toBe(0);
  });
});
