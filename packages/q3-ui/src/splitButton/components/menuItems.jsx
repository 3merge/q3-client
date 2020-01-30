import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Check from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const MenuItems = ({ activeIndex, items }) => (
  <MenuList>
    {items.map(({ label, description, onClick }, i) => (
      <MenuItem
        key={label}
        onClick={onClick}
        style={{
          marginTop: i !== 0 ? '-1rem' : 0,
          borderBottom: '1px solid whitesmoke',
          whiteSpace: 'normal',
        }}
      >
        <Box>
          <Typography
            display="block"
            component="strong"
            gutterBottom
            style={{ fontSize: '1rem', margin: 0 }}
          >
            {label}
            {activeIndex === i && <Check size="1rem" />}
          </Typography>
          <Typography
            component="small"
            style={{ fontSize: '0.799rem' }}
          >
            {description}
          </Typography>
        </Box>
      </MenuItem>
    ))}
  </MenuList>
);

MenuItems.propTypes = {
  /**
   * The index of the item currently selected.
   */
  activeIndex: PropTypes.number.isRequired,
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
