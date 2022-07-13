import React from 'react';
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@material-ui/core';
import { useOpen } from 'useful-state';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import HelpIcon from '@material-ui/icons/Help';
import { object } from 'q3-ui-helpers';
import FileManagerContext from '../FileManagerContext';
import FileManagerBatchContext from '../FileManagerBatchContext';

const withContextMenu = (Component) => (props) => {
  const { id, onClick, move } = props;
  const { open, isOpen, close, anchorEl } = useOpen();
  const ctx = React.useContext(FileManagerContext);
  const { enable, disable, select } = React.useContext(
    FileManagerBatchContext,
  );

  const handleEventWithCallback = (e, fn) => {
    e.preventDefault();
    e.stopPropagation();
    fn(e);
  };

  const handleRename = (e) => {
    const n = prompt('newName');

    if (n)
      return object.noop(
        ctx.patch(id)({
          name: n,
        }),
      );

    close(e);
  };

  const handleRemove = () => object.noop(ctx.remove(id)());

  return (
    <>
      <Component
        {...props}
        onContextMenu={(e) => {
          handleEventWithCallback(e, open);
          select(id);
          disable();
        }}
      />
      <Menu
        className="q3-context-menu"
        BackdropProps={{
          invisible: true,
          onContextMenu: (e) => {
            if (!isOpen) return;
            handleEventWithCallback(e, close);
          },
        }}
        id="file-sorting"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={(e) => {
          close(e);
          enable();
        }}
        elevation={5}
      >
        <MenuItem
          dense
          onClick={(e) => {
            onClick(e);
            close(e);
          }}
        >
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          Preview
        </MenuItem>
        <MenuItem dense>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          Download
        </MenuItem>
        <Divider component="li" />
        <MenuItem dense onClick={handleRename}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Rename
        </MenuItem>
        <MenuItem
          dense
          onClick={(e) => {
            move(e);
            close(e);
          }}
        >
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          Move
        </MenuItem>
        <MenuItem dense onClick={handleRemove}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
        <Divider component="li" />
        <MenuItem dense>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          About
        </MenuItem>
      </Menu>
    </>
  );
};

export default withContextMenu;
