import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

const MenuItems = ({ items, onDone }) => (
  <MenuList>
    {items.map(({ label, onClick }) => (
      <MenuItem
        key={label}
        onClick={() => {
          onClick();
          onDone();
        }}
      >
        {label}
      </MenuItem>
    ))}
  </MenuList>
);
