import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';
import { isLoggedIn } from 'q3-ui-permissions';

import CheckoutLayout from 'gatsby-theme-q3/src/components/checkoutLayout';
import Uploader from 'q3-ui/lib/upload';

const Checkout = ({ enableGuestCheckout }) => {
  const hasSession = isLoggedIn();
  if (!enableGuestCheckout && !hasSession) {
    return <Redirect to="/login" noThrow />;
  }

  return (
    <CheckoutLayout>
      <Uploader />
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
