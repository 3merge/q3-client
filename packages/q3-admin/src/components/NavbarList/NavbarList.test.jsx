import React from 'react';
import { List } from '@material-ui/core';
import NavbarList from './NavbarList';

jest.mock('../../hooks/useAccountPages', () =>
  jest.fn().mockReturnValue([]),
);

describe('NavbarList', () => {
  it('should not render undefined keys', () => {
    expect(
      global
        .mount(<NavbarList items={{ undefined: [] }} />)
        .find(List)
        .first()
        .prop('subheader'),
    ).toBeUndefined();
  });

  it('should render keys as subheaders', () => {
    expect(
      global
        .mount(<NavbarList items={{ foo: [] }} />)
        .find(List)
        .first()
        .prop('subheader'),
    ).not.toBeUndefined();
  });
});
