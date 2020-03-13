import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import {
  red,
  green,
  orange,
} from '@material-ui/core/colors';

const CellBadge = ({ status, color, customColor }) => {
  const style = {};
  const danger = red[500];
  const warning = orange[500];
  const success = green[500];

  if (color === 'danger') style.backgroundColor = danger;
  if (color === 'warning') style.backgroundColor = warning;
  if (color === 'success') style.backgroundColor = success;
  if (customColor) style.backgroundColor = customColor;
  if (style.backgroundColor) style.color = '#FFF';

  return status ? (
    <Chip
      size="small"
      color={color}
      label={status}
      style={style}
    />
  ) : null;
};

CellBadge.propTypes = {
  color: PropTypes.string,
  status: PropTypes.string.isRequired,
  customColor: PropTypes.string,
};

CellBadge.defaultProps = {
  color: 'secondary',
  customColor: null,
};

export default CellBadge;
