import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { breakdownColourPaletteBySeverity } from '../utils';
import useStyle from './styles';

const StatusChip = ({ severity, ...props }) => (
  <Chip
    {...props}
    classes={useStyle()}
    style={breakdownColourPaletteBySeverity(severity)}
  />
);

StatusChip.defaultProps = {
  severity: 0,
};

StatusChip.propTypes = {
  severity: PropTypes.number,
};

export default StatusChip;
