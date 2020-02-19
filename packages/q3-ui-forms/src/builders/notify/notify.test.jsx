import React from 'react';
import Fade from '@material-ui/core/Fade';
import Notify from '.';

describe('Notify', () => {
  it('should render <Fade /> as in=false', () => {
    const el = global
      .shallow(<Notify show={false} title="Sample" />)
      .find(Fade);
    expect(el.props()).toHaveProperty('in', false);
  });
});
