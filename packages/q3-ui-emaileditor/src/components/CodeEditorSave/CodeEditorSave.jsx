import React from 'react';
import PropTypes from 'prop-types';
import { Box, Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const CodeEditorSave = ({ onClick }) => (
  <Box
    position="fixed"
    bottom="1rem"
    right="1rem"
    zIndex="100"
  >
    <Fab color="primary" onClick={onClick}>
      <SaveIcon />
    </Fab>
  </Box>
);

CodeEditorSave.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CodeEditorSave;
