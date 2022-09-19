import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu as MuiMenu,
  MenuItem,
} from '@material-ui/core';
import { map } from 'lodash';
import { useOpen } from 'useful-state';
import SegmentsContext from '../SegmentsContext';

const Menu = ({ children, id, items }) => {
  const { enabled } = React.useContext(SegmentsContext);
  const {
    anchorEl,
    close,
    isOpen,
    open: handleOpen,
  } = useOpen();

  const open = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!enabled) return;
    handleOpen(e);
  };

  return (
    <>
      {children({ open })}
      <MuiMenu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={id}
        open={isOpen}
        onClose={close}
        onContextMenu={(event) => {
          event.preventDefault();
        }}
        onMouseDown={(e) => {
          close(e);
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {map(items, (item) => (
          <MenuItem
            dense
            key={item.label}
            onClick={item.onClick}
            onMouseDown={item.onMouseDown}
          >
            {item.label}
          </MenuItem>
        ))}
      </MuiMenu>
    </>
  );
};

Menu.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Menu;
