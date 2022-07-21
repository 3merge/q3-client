import React from 'react';
import { IconButton } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import useDialog from '../useDialog';
import { DIALOG_MOVE } from '../constants';

const DirectoryMoveTo = () => {
  const { open } = useDialog(DIALOG_MOVE, {});

  return (
    <IconButton color="inherit" onClick={open}>
      <AccountTreeIcon />
    </IconButton>
  );
};

export default DirectoryMoveTo;
