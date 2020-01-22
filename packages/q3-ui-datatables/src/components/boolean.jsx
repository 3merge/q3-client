import React from 'react';
import PropTypes from 'prop-types';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import { green, red } from '@material-ui/core/colors';

const CellCheck = ({ show }) =>
  show ? (
    <Check style={{ color: green[500] }} />
  ) : (
    <Close style={{ color: red[500] }} />
  );

CellCheck.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default CellCheck;
