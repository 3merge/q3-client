import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import useDialog from '../useDialog';
import { DIALOG_DELETE } from '../constants';

const DirectoryDeleteFolder = () => {
  const { open } = useDialog(DIALOG_DELETE);

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
