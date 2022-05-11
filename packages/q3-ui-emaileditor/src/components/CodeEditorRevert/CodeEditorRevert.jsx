import React from 'react';
import PropTypes from 'prop-types';
import { Box, Fab } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import Tooltip from '@material-ui/core/Tooltip';
// eslint-disable-next-line
import { useAuth } from 'q3-ui-permissions';
import { useTranslation } from 'q3-ui-locale';
import { URL_NAME } from '../useEmailTemplates/useEmailTemplates';

const CodeEditorRevert = ({ onClick }) => {
  const { Hide } = useAuth(URL_NAME);
  const { t } = useTranslation('labels');

  return (
    <Hide op="Delete">
      <Box
        position="fixed"
        bottom="1rem"
        right="4.75rem"
        zIndex="100"
      >
        <Tooltip title={t('revert')}>
          <Fab
            id="revert-email-template"
            color="secondary"
            onClick={onClick}
          >
            <HistoryIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Hide>
  );
};

CodeEditorRevert.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CodeEditorRevert;
