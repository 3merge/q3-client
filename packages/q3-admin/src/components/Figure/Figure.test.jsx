import React from 'react';
import Grid from '@material-ui/core/Grid';
import Figure from './Figure';

const renderFigureGridElement = (props, len) => {
  const el = global.shallow(
    <Figure
      title="title"
      captionComponent={<span>Caption</span>}
      {...props}
    >
      <div />
    </Figure>,
  );

  const target = el.find(Grid).first().props();
  return expect(target).toHaveProperty('lg', len);
};

describe('Figure', () => {
  it('should render 12-point grid item', () =>
    renderFigureGridElement({ fullWidth: true }, 12));

  it('should render 6-point grid item', () =>
    renderFigureGridElement({ fullWidth: false }, 6));
});
