import React from 'react';
import Grid from '@material-ui/core/Grid';
import FigureWrapper from './FigureWrapper';

const renderFigureGridElement = (props, len) => {
  const el = global.shallow(
    <FigureWrapper {...props}>
      <div />
    </FigureWrapper>,
  );

  const target = el.find(Grid).first().props();
  return expect(target).toHaveProperty('lg', len);
};

describe('FigureWrapper', () => {
  it('should render 12-point grid item', () =>
    renderFigureGridElement({ fullWidth: true }, 12));

  it('should render 6-point grid item', () =>
    renderFigureGridElement({ fullWidth: false }, 6));
});
