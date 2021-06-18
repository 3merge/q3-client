import React from 'react';
import { Button, Menu } from '@material-ui/core';
import { open } from 'useful-state';
import Download from './Download';

jest.mock('useful-state', () => {
  const mockOpen = jest.fn();

  return {
    open: mockOpen,
    useOpen: jest.fn().mockReturnValue({
      isOpen: true,
      anchorEl: { current: null },
      close: jest.fn(),
      open: mockOpen,
    }),
  };
});

describe('Download', () => {
  it('should disable IconButton on empty data', () => {
    const el = global.shallow(<Download />);
    expect(el.find(Button).props()).toHaveProperty(
      'disabled',
      true,
    );
  });

  it('should open Menu IconButton click', () => {
    const el = global.shallow(
      <Download data={[{ value: 1 }]} />,
    );
    el.find(Button).simulate('click');
    expect(el.find(Menu).props()).toHaveProperty(
      'open',
      true,
    );

    expect(open).toHaveBeenCalled();
  });
});
