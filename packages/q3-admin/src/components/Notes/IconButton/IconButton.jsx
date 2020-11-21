import React from 'react';
import { IconButton as MuiIconButton } from '@material-ui/core';
import Dialog from 'q3-ui-dialog';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import View from '../View';

const IconButton = () => (
  <Dialog
    title="notes"
    variant="drawer"
    renderContent={View}
    renderTrigger={(onClick) => (
      <MuiIconButton onClick={onClick}>
        <SpeakerNotesIcon />
      </MuiIconButton>
    )}
  />
);

export default IconButton;
