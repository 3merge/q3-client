import React from 'react';
import { IconButton } from '@material-ui/core';
import Appbar from './Appbar';

describe('Appbar', () => {
  it('should not render menu button', () => {
    expect(
      global
        .shallow(<Appbar />)
        .find(IconButton)
        .exists(),
    ).toBeFalsy();
  });

  it('should render menu button', () => {
    expect(
      global
        .shallow(<Appbar onClick={jest.fn()} />)
        .find(IconButton)
        .exists(),
    ).toBeTruthy();
  });
});
