import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const MenuItems = ({ items }) => (
  <MenuList>
    {items.map(({ label, description, onClick }) => (
      <MenuItem key={label} onClick={onClick}>
        <Typography variant="overline">{label}</Typography>
        <Typography component="small">
          {description}
        </Typography>
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
