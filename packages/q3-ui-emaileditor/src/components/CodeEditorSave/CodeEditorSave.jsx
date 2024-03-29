import React from 'react';
import PropTypes from 'prop-types';
import { Box, Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuth } from 'q3-ui-permissions';
import { useTranslation } from 'q3-ui-locale';
import { URL_NAME } from '../useEmailTemplates/useEmailTemplates';

const CodeEditorSave = ({ onClick }) => {
  const { Hide } = useAuth(URL_NAME);
  const { t } = useTranslation('labels');

  return (
    <Hide op="Update">
      <Box
        position="fixed"
        bottom="1rem"
        right="1rem"
        zIndex="100"
      >
        <Tooltip title={t('save')}>
          <Fab
            id="save-email-template"
            color="secondary"
            onClick={onClick}
          >
            <SaveIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Hide>
  );
};

CodeEditorSave.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CodeEditorSave;
