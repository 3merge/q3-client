import React from 'react';
import Appbar from './Navbar';

describe('Navbar', () => {
  it('should not render footer', () => {
    expect(
      global
        .mount(<Appbar />)
        .find('footer')
        .exists(),
    ).toBeFalsy();
  });

  it('should render footer', () => {
    expect(
      global
        .mount(<Appbar footer={<div />} />)
        .find('footer')
        .exists(),
    ).toBeTruthy();
  });
});
