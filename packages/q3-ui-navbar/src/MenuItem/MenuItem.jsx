import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem as MuiMenuItem,
  Divider,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Done';

const MenuItem = ({
  divider,
  checked,
  label,
  onClick,
  onMouseDown,
}) =>
  divider ? (
    <Divider component="li" />
  ) : (
    <MuiMenuItem
      dense
      key={label}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {checked && <CheckIcon />}
      {label}
    </MuiMenuItem>
  );

MenuItem.defaultProps = {
  checked: false,
  divider: false,
  label: undefined,
  onClick: undefined,
  onMouseDown: undefined,
};

MenuItem.propTypes = {
  checked: PropTypes.bool,
  divider: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
};

export default MenuItem;
