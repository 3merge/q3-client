import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import useDialog from '../useDialog';

const DirectoryDeleteFolder = () => {
  const { open } = useDialog('q3-file-dialog-delete');

  return (
    <IconButton
      aria-label="delete"
      color="inherit"
      onClick={open}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DirectoryDeleteFolder;
