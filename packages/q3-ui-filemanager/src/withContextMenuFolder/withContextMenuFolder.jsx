import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import { useOpen } from 'useful-state';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { object } from 'q3-ui-helpers';
import FileManagerContext from '../FileManagerContext';
import FileManagerBatchContext from '../FileManagerBatchContext';
import { withQueryParamIds } from '../utils';

const withContextMenu = (Component) => (props) => {
  const { id, onClick, move, path } = props;
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
        ctx.patch(withQueryParamIds(id))({
          folder: path
            .split('/')
            .splice(0, -1)
            .concat(n)
            .join('/'),
          replace: true,
        }),
      );

    close(e);
  };

  const handleRemove = () =>
    object.noop(ctx.remove(withQueryParamIds(id))());

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
        id="folder"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={(e) => {
          close(e);
          enable();
        }}
      >
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
      </Menu>
    </>
  );
};

export default withContextMenu;
