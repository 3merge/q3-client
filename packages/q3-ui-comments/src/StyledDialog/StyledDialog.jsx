import React from 'react';
import Dialog from 'q3-ui-dialog';
import useStyle from './styles';

const StyledDialog = (props) => (
  <Dialog
    draggable
    classes={useStyle()}
    ModalProps={{
      hideBackdrop: true,
      disableScrollLock: true,
      fullScreen: true,
    }}
    PaperProps={{
      elevation: 5,
    }}
    {...props}
  />
);

export default StyledDialog;
