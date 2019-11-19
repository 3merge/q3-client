import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';
import { isLoggedIn } from 'q3-ui-permissions';
import Pay from 'q3-ui-commons/lib/views/pay';
import CheckoutLayout from '../components/checkoutLayout';

const Checkout = ({ enableGuestCheckout }) => {
  const hasSession = isLoggedIn();

  if (!enableGuestCheckout && !hasSession) {
    return <Redirect to="/login" noThrow />;
  }

  return (
    <CheckoutLayout>
      <Pay />
    </CheckoutLayout>
  );
};

Checkout.propTypes = {
  enableGuestCheckout: PropTypes.bool,
};

Checkout.defaultProps = {
  enableGuestCheckout: true,
};

export default Checkout;
