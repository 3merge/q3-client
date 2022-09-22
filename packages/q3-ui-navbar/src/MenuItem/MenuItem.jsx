import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem as MuiMenuItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Done';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const MenuItem = ({
  checked,
  label,
  nested,
  onClick,
  onMouseDown,
}) => (
  <MuiMenuItem
    dense
    key={label}
    onClick={onClick}
    onMouseDown={onMouseDown}
  >
    {checked && <CheckIcon />}
    {label}
    {nested && (
      <ListItemSecondaryAction>
        <ArrowForwardIosIcon />
      </ListItemSecondaryAction>
    )}
  </MuiMenuItem>
);

MenuItem.defaultProps = {
  checked: false,
  nested: false,
  onClick: undefined,
  onMouseDown: undefined,
};

MenuItem.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  nested: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
};

export default MenuItem;
