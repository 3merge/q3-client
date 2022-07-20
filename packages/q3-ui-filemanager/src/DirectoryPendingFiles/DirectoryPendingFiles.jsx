import React from 'react';
import PropTypes from 'prop-types';
import { some, size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import Alert from '@material-ui/lab/Alert';
import { Box } from '@material-ui/core';

const DirectoryPendingFiles = ({ pending }) => {
  const { t } = useTranslation('labels');

  return size(pending) > 0 ? (
    <Box mb={1}>
      {!some(pending, (item) => item.error) ? (
        <Alert severity="info">{t('uploading')}...</Alert>
      ) : (
        <Alert severity="error">{t('uploadFailed')}</Alert>
      )}
    </Box>
  ) : null;
};

DirectoryPendingFiles.defaultProps = {
  pending: [],
};

DirectoryPendingFiles.propTypes = {
  // eslint-disable-next-line
  pending: PropTypes.arrayOf(PropTypes.any),
};

export default DirectoryPendingFiles;
