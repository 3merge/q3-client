import React from 'react';
import PropTypes from 'prop-types';
import { navigate, Redirect } from '@reach/router';
import { isLoggedIn } from 'q3-ui-permissions';
import {
  appendFields,
  findValidations,
} from 'q3-ui-forms/lib/builders/submit';
import { Check } from 'q3-ui/lib/inputs';
import AddressSchema from 'q3-ui-commons/lib/schemas/address';
import Grid from '@material-ui/core/Grid';
import CheckoutLayout from 'gatsby-theme-q3/src/components/checkoutLayout';
import VerticalWizard from 'q3-ui/lib/verticalWizard';

const reduceAddressSchema = (prefix) => {
  const [listing, contact] = AddressSchema;
  const output = { ...contact, ...listing };
  return prefix
    ? Object.entries(output).reduce(
        (a, [k, v]) =>
          Object.assign(a, {
            [`${prefix}.${k}`]: v,
          }),
        {},
      )
    : output;
};

const Checkout = ({ enableGuestCheckout }) => {
  const hasSession = isLoggedIn();
  const billingSchema = reduceAddressSchema('billing');
  const shippingSchema = reduceAddressSchema('shipping');

  if (!enableGuestCheckout && !hasSession) {
    return <Redirect to="/login" noThrow />;
  }

  const getContent = (i) =>
    ['billing', 'shipping', 'shippingOptions'][i];

  const steps = [
    (values) => appendFields(billingSchema, {}, values),
    (values) => appendFields(shippingSchema, {}, values),
  ];

  const getValidation = (i) =>
    findValidations([billingSchema, shippingSchema][i]);

  return (
    <CheckoutLayout>
      <VerticalWizard
        getContent={getContent}
        getValidation={getValidation}
        onSubmit={() => null}
        steps={steps}
      />
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
