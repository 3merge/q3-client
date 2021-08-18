import React from 'react';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const DialogDraggable = (props) => (
  <Draggable
    bounds="parent"
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
  >
    <div>
      <Paper {...props} />
    </div>
  </Draggable>
);

export default DialogDraggable;
