import React from 'react';
import Typography from '@material-ui/core/Typography';
import DialogHeader from './header';

const measureTitleLength = (props) =>
  global
    .shallow(<DialogHeader {...props} />)
    .find(Typography).length;

describe('DialogHeader', () => {
  it('should not render a title', () => {
    expect(measureTitleLength()).toEqual(0);
  });

  it('should render a title', () => {
    expect(measureTitleLength({ title: 'foo' })).toEqual(1);
  });
});
