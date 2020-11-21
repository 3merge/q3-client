import React from 'react';
import { IconButton as MuiIconButton } from '@material-ui/core';
import { NoteAdd } from '@material-ui/icons';
import Dialog from 'q3-ui-dialog';
import View from '../View';

const IconButton = () => (
  <Dialog
    title="files"
    variant="drawer"
    renderContent={View}
    renderTrigger={(onClick) => (
      <MuiIconButton onClick={onClick}>
        <NoteAdd />
      </MuiIconButton>
    )}
  />
);

export default IconButton;
