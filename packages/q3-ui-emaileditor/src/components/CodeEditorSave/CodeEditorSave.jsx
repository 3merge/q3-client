import React from 'react';
import { Box, Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import useCodeMirror from '../useCodeMirror';

const CodeEditorSave = () => (
  <Box
    position="fixed"
    bottom="1rem"
    right="1rem"
    zIndex="100"
  >
    <Fab color="primary" onClick={useCodeMirror().save}>
      <SaveIcon />
    </Fab>
  </Box>
);

export default CodeEditorSave;
