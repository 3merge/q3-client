import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem as MuiMenuItem,
  Divider,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Done';

const MenuItem = React.forwardRef(
  (
    { divider, checked, label, onClick, onMouseDown },
    ref,
  ) =>
    divider ? (
      <Divider component="li" ref={ref} />
    ) : (
      <MuiMenuItem
        dense
        key={label}
        onClick={onClick}
        onMouseDown={onMouseDown}
        ref={ref}
      >
        {checked && <CheckIcon />}
        {label}
      </MuiMenuItem>
    ),
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
