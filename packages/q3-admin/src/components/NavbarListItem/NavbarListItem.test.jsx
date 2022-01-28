import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import { Link } from '@reach/router';
import useful from 'useful-state';
import NavbarListItem from './NavbarListItem';

jest.mock('useful-state', () => {
  const state = false;
  const close = jest.fn();
  const open = jest.fn();
  const toggle = jest.fn();

  return {
    close,
    open,
    useToggle: jest.fn().mockReturnValue({
      close,
      state,
      toggle,
      open,
    }),
  };
});

jest.mock('@reach/router', () => ({
  Link: ({ children }) => children,
}));

describe('NavbarListItem', () => {
  it('should close when curent', () => {
    global
      .mount(<NavbarListItem label="foo" to="/" />)
      .find(Link);

    expect(useful.close).toHaveBeenCalled();
  });

  it('should open when current', () => {
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([true, jest.fn()]);

    global
      .mount(<NavbarListItem label="foo" to="/" />)
      .find(Link);

    expect(useful.open).toHaveBeenCalled();
  });

  it('should not render a collapse', () => {
    expect(
      global
        .shallow(<NavbarListItem label="foo" to="/" />)
        .find(Collapse)
        .exists(),
    ).toBeFalsy();
  });

  it('should render items under collapse', () => {
    expect(
      global
        .shallow(
          <NavbarListItem
            label="foo"
            to="/"
            segments={{
              one: '?',
            }}
          />,
        )
        .find(Collapse)
        .exists(),
    ).toBeTruthy();
  });
});
