import React from 'react';
import PropTypes from 'prop-types';
import { Box, Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useAuth } from 'q3-ui-permissions';
import { URL_NAME } from '../useEmailTemplates/useEmailTemplates';

const CodeEditorSave = ({ onClick }) => {
  const { Hide } = useAuth(URL_NAME);

  return (
    <Hide op="Update">
      <Box
        position="fixed"
        bottom="1rem"
        right="1rem"
        zIndex="100"
      >
        <Fab
          id="save-email-template"
          color="primary"
          onClick={onClick}
        >
          <SaveIcon />
        </Fab>
      </Box>
    </Hide>
  );
};

CodeEditorSave.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CodeEditorSave;
