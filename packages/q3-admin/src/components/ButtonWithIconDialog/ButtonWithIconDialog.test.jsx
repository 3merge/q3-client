import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import ButtonWithIconDialog from './ButtonWithIconDialog';

jest.mock('@material-ui/core', () => ({
  useMediaQuery: jest.fn(),
}));

describe('ButtonWithIconDialog', () => {
  it('should call dialog open when mobile', () => {
    const open = jest.fn();
    useMediaQuery.mockReturnValue(true);

    global
      .shallow(
        <ButtonWithIconDialog
          label="test"
          icon={AccountBox}
          renderContent={jest.fn()}
        />,
      )
      .props()
      .renderTrigger(open)
      .props.onClick();

    expect(open).toHaveBeenCalled();
  });

  it('should call context when desktop', () => {
    const setState = jest.fn();
    jest.spyOn(React, 'useContext').mockReturnValue({
      setState,
    });

    useMediaQuery.mockReturnValue(false);

    global
      .shallow(
        <ButtonWithIconDialog
          label="test"
          icon={AccountBox}
          renderContent={jest.fn()}
        />,
      )
      .props()
      .renderTrigger(jest.fn())
      .props.onClick();

    expect(setState).toHaveBeenCalled();
  });
});
