import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';

const CellTel = ({ children }) => (
  <Link href={`tel:${children}`}>{children}</Link>
);

CellTel.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CellTel;
