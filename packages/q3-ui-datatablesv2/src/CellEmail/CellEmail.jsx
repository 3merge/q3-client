import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';

const CellEmail = ({ children }) => (
  <Link href={`mailTo:${children}`}>{children}</Link>
);

CellEmail.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CellEmail;
