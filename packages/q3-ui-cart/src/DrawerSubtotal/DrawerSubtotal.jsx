import React from 'react';
import { string } from 'q3-ui-helpers';
import Typography from '@material-ui/core/Typography';
import { CartContext } from '../context';

const DrawerSubtotal = () => {
  const {
    subtotal = 0,
    currency = 'CAD',
  } = React.useContext(CartContext);

  return (
    <Typography aria-live="polite" variant="body2">
      <span
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
        }}
      >
        subtotal
      </span>
      <strong>{string.toPrice(subtotal)}</strong>{' '}
      <small>{currency}</small>
    </Typography>
  );
};

DrawerSubtotal.defaultProps = {};
DrawerSubtotal.propTypes = {};

export default DrawerSubtotal;
