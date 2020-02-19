import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import Notify from '.';

describe('Notify', () => {
  it('should render <Fade /> as in=false', () => {
    const el = global
      .shallow(<Notify show={false} title="Sample" />)
      .find(Collapse);
    expect(el.props()).toHaveProperty('in', false);
  });
});
