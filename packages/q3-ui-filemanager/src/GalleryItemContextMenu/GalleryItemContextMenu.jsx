import React from 'react';
import {
  Menu,
  MenuItem,
  Divider,
  ListItem,
  Box,
} from '@material-ui/core';
import { useOpen } from 'useful-state';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const GalleryItemContextMenu = ({ children }) => {
  const { open, isOpen, close, anchorEl } = useOpen();

  const handleEventWithCallback = (e, fn) => {
    e.preventDefault();
    e.stopPropagation();
    fn(e);
  };

  const handleRename = () => null;

  return (
    <>
      {children((e) => {
        handleEventWithCallback(e, open);
      })}
      <Menu
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
        onClose={close}
        elevation={5}
      >
        <MenuItem dense>
          <EditIcon />
          Preview
        </MenuItem>
        <MenuItem dense>
          <EditIcon />
          Download
        </MenuItem>
        <MenuItem dense>
          <EditIcon />
          Rename
        </MenuItem>
        <MenuItem dense>
          <AccountTreeIcon />
          Move
        </MenuItem>
        <MenuItem dense>
          <DeleteIcon />
          Delete
        </MenuItem>
        <ListItem>
          <Box py={0.5}>
            <small>last updated on 2021-12-13</small>
          </Box>
        </ListItem>
      </Menu>
    </>
  );
};

export default GalleryItemContextMenu;
