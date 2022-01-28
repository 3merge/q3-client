import React from 'react';
import { ListSubheader } from '@material-ui/core';
import NavbarList from './NavbarList';

describe('NavbarList', () => {
  it('should not render undefined keys', () => {
    expect(
      global
        .mount(<NavbarList items={{ undefined: [] }} />)
        .find(ListSubheader)
        .exists(),
    ).toBeFalsy();
  });

  it('should render keys as subheaders', () => {
    expect(
      global
        .mount(<NavbarList items={{ foo: [] }} />)
        .find(ListSubheader)
        .exists(),
    ).toBeTruthy();
  });
});
