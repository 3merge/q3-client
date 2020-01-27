import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, MenuList } from '@material-ui/core';

const MenuItems = ({ items }) => (
  <MenuList>
    {items.map(({ label, description, onClick }) => (
      <MenuItem key={label} onClick={onClick}>
        {label}
        {description}
      </MenuItem>
    ))}
  </MenuList>
);

MenuItems.propTypes = {
  /**
   * An array of dropdown items.
   * The click handler, in this context, will set it as default action.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default MenuItems;
