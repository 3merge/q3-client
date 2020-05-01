import React from 'react';
import { IconButtonWithLoading } from 'q3-ui/lib/iconButton';
import { useOpen } from 'useful-state';
import Launcher from './Launcher';

jest.mock('useful-state', () => ({
  useOpen: jest.fn(),
}));

jest.mock('q3-ui/lib/iconButton', () => ({
  IconButtonWithLoading: jest.fn().mockReturnValue(null),
}));

const stubUseOpen = () => {
  const open = jest.fn();
  useOpen.mockReturnValue({
    isOpen: false,
    close: jest.fn(),
    open,
  });

  return open;
};

const stubContext = (args) =>
  jest.spyOn(React, 'useContext').mockReturnValue(args);

const getBagdeContent = () =>
  global
    .shallow(<Launcher />)
    .find(IconButtonWithLoading)
    .props().badgeContent;

describe('Launcher', () => {
  it('should interpret badge content from context item length', () => {
    stubUseOpen();
    stubContext({ items: [1, 2, 3] });
    expect(getBagdeContent()).toBe(3);
  });

  it('should open children on error', () => {
    const open = stubUseOpen();
    const childFn = jest.fn();

    stubContext({ hasError: true });
    const el = global.mount(<Launcher>{childFn}</Launcher>);
    el.update();

    expect(open).toHaveBeenCalled();
    expect(childFn).toHaveBeenCalledWith(
      expect.any(Function),
      false,
    );
  });
});
