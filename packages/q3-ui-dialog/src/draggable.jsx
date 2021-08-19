import React from 'react';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const DialogDraggable = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return matches ? (
    <Draggable
      bounds="parent"
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <div>
        <Paper {...props} />
      </div>
    </Draggable>
  ) : (
    <Paper {...props} />
  );
};
export default DialogDraggable;
