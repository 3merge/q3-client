import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { map, lowerCase, find } from 'lodash';

const ToolbarDropdownMenu = ({
  active,
  activeLabel,
  label,
  options,
}) => {
  const [anchorEl, setAnchorEl] = React.useState();

  const setAnchorElToTarget = (e) => setAnchorEl(e.target);

  const clearAnchorEl = () => setAnchorEl(null);

  return (
    <Box>
      <Button
        type="button"
        onClick={setAnchorElToTarget}
        size="small"
      >
        {activeLabel || label}
      </Button>
      <Menu
        id={lowerCase(label)}
        anchorEl={anchorEl}
        keepMounted
        disableScrollLock
        open={Boolean(anchorEl)}
        onClose={clearAnchorEl}
        disablePortal
        MenuListProps={{
          component: 'div',
        }}
      >
        {map(
          options,
          ({
            quillClassKey,
            quillClassValue,
            label: optionLabel,
          }) => (
            <MenuItem
              dense
              component="button"
              ListItemClasses={{
                root: `ql-${quillClassKey}`,
              }}
              key={lowerCase(optionLabel)}
              value={quillClassValue}
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              {optionLabel}
            </MenuItem>
          ),
        )}
      </Menu>
    </Box>
  );
};

ToolbarDropdownMenu.defaultProps = {};

ToolbarDropdownMenu.propTypes = {
  isActive: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      quillClassKey: PropTypes.string.isRequired,
      quillClassValue: PropTypes.string,
    }),
  ).isRequired,
};

export default ToolbarDropdownMenu;
