import React from 'react';
import PropTypes from 'prop-types';
import Cards from 'react-credit-cards';
import Box from '@material-ui/core/Box';
import 'react-credit-cards/es/styles-compiled.css';

export const getFirstLetterOfCard = (type) => {
  switch (type) {
    case 'AS':
      return 34;
    case 'VI':
      return 4;
    case 'MC':
    case 'CA':
      return 5;
    case 'DS':
      return 6;
    default:
      return '*';
  }
};

export const getFullName = (firstName, lastName) =>
  [firstName, lastName].filter(Boolean).join(' ');

export const mockEncryptedCreditCardNumber = (
  type,
  digits,
) => `${getFirstLetterOfCard(type)}***********${digits}`;

const CreditCard = ({
  firstName,
  lastName,
  cardType,
  lastFourDigits,
  expiry,
}) => (
  <Box maxWidth="100%">
    <Cards
      expiry={expiry}
      name={getFullName(firstName, lastName)}
      number={mockEncryptedCreditCardNumber(
        cardType,
        lastFourDigits,
      )}
    />
  </Box>
);

CreditCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
  lastFourDigits: PropTypes.string.isRequired,
  expiry: PropTypes.string.isRequired,
};

export default CreditCard;
