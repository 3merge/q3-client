import React from 'react';
import NativeIconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Add from '@material-ui/icons/Add';
import IconButton from '.';

describe('IconButton', () => {
  const wrapper = global.shallow(
    <IconButton
      icon={Add}
      label="foo"
      buttonProps={{
        onClick: jest.fn(),
        type: 'submit',
      }}
    />,
  );

  it('should forward label to Tooltip', () =>
    expect(wrapper.find(Tooltip).props()).toHaveProperty(
      'title',
      'foo',
    ));

  it('should forward buttonProps', () =>
    expect(
      wrapper.find(NativeIconButton).props(),
    ).toMatchObject({
      onClick: expect.any(Function),
      type: 'submit',
    }));
});
