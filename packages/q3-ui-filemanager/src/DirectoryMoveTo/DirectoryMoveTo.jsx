import React from 'react';
import { IconButton } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import useDialog from '../useDialog';
import { DIALOG_MOVE } from '../constants';
import withAuthBoolean from '../withAuthBoolean';

const DirectoryMoveTo = () => {
  const { open } = useDialog(DIALOG_MOVE, {});

  return (
    <IconButton
      id="q3-filemanager-batch-move-to-button"
      color="inherit"
      onClick={open}
    >
      <AccountTreeIcon />
    </IconButton>
  );
};

export default withAuthBoolean(DirectoryMoveTo, 'canEdit');
