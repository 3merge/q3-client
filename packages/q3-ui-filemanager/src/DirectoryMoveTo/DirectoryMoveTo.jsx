import React from 'react';
import { IconButton } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import useDialog from '../useDialog';

const DirectoryMoveTo = () => {
  const { open } = useDialog('q3-file-dialog-move-to', {});

  return (
    <IconButton color="inherit" onClick={open}>
      <AccountTreeIcon />
    </IconButton>
  );
};

export default DirectoryMoveTo;
