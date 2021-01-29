import React from 'react';
import Typography from '@material-ui/core/Typography';
import Subtotal from './DrawerSubtotal';

const stubContext = (args) =>
  jest.spyOn(React, 'useContext').mockReturnValue(args);

const getRenderedText = () =>
  global
    .shallow(<Subtotal />)
    .find(Typography)
    .text();

describe('Subtotal', () => {
  it('should default value and currency', () => {
    stubContext({});
    expect(getRenderedText()).toMatch('$0.00 CAD');
  });

  it('should render a button given the context context', () => {
    stubContext({ subtotal: 12.99, currency: 'USD' });
    expect(getRenderedText()).toMatch('$12.99 USD');
  });
});
