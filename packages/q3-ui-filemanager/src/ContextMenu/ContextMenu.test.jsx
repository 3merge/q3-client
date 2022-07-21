import React from 'react';
import { useOpen } from 'useful-state';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ContextMenu from './ContextMenu';

let open;
let close;

const renderWithEvent = (props) => {
  const eventStub = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  };

  const el = global.shallow(
    <ContextMenu id="test" {...props}>
      {(callback) => {
        callback(eventStub);
        return null;
      }}
    </ContextMenu>,
  );

  return {
    el,
    eventStub,
  };
};

beforeEach(() => {
  open = jest.fn();
  close = jest.fn();

  useOpen.mockReturnValue({
    isOpen: true,
    open,
    close,
  });
});

describe('ContextMenu', () => {
  it('should select ID and disable drag when opening the context menu', () => {
    const contextStub = {
      disable: jest.fn(),
      select: jest.fn(),
    };

    jest
      .spyOn(React, 'useContext')
      .mockReturnValue(contextStub);

    Object.values({
      // must deconstruct first
      ...renderWithEvent().eventStub,
      ...contextStub,
      open,
    }).forEach((mockFn) => {
      expect(mockFn).toHaveBeenCalled();
    });

    expect(contextStub.select).toHaveBeenCalledWith('test');
  });

  it('should close menu when not already closed', () => {
    const { el, eventStub } = renderWithEvent();
    el.find(Menu)
      .prop('BackdropProps')
      .onContextMenu(eventStub);

    expect(close).toHaveBeenCalledWith(eventStub);
  });

  it('should render list item with click handler', () => {
    const onClick = jest.fn();
    const { el } = renderWithEvent({
      items: [
        {
          divider: true,
        },
        {
          label: 'test',
          icon: 'icon ',
          onClick,
        },
      ],
    });

    const menuItem = el.find(MenuItem);
    expect(el.find(Divider)).toHaveLength(1);
    expect(menuItem).toHaveLength(1);
    expect(menuItem.text()).toMatch('icon test');
    menuItem.props().onClick();
    expect(onClick).toHaveBeenCalled();
  });
});
