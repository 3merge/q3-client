import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import AddToCartButtonLoading from './AddToCartButtonLoading';

describe('AddToCartButtonLoading', () => {
  it('should show loading indicator', () => {
    const loading = global
      .shallow(<AddToCartButtonLoading loading />)
      .find(CircularProgress);
    expect(loading).toHaveLength(1);
  });

  it('should fade in otherwise', () => {
    const fading = global
      .shallow(<AddToCartButtonLoading />)
      .find(Fade);
    expect(fading).toHaveLength(1);
  });
});
