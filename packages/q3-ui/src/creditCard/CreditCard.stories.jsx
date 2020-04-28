import React from 'react';
import CreditCard from './CreditCard';

export default {
  title: 'Q3 UI/Components/CreditCard',
};

const stub = {
  firstName: 'Jon',
  lastName: 'Doe',
  expiry: '02/12',
};

export const Visa = () => (
  <CreditCard
    {...stub}
    cardType="VI"
    lastFourDigits="1234"
  />
);

export const Mastercard = () => (
  <CreditCard
    {...stub}
    cardType="MC"
    lastFourDigits="1234"
  />
);

export const Amex = () => (
  <CreditCard
    {...stub}
    cardType="AS"
    lastFourDigits="1234"
  />
);
