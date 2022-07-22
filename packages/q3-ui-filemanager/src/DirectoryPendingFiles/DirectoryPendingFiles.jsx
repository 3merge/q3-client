import React from 'react';
import PropTypes from 'prop-types';
import { some, size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import Alert from '@material-ui/lab/Alert';
import { Box } from '@material-ui/core';

const DirectoryPendingFiles = ({ pending }) => {
  const { t } = useTranslation('labels');

  const hasSize = () => size(pending) > 0;

  const containsError = () =>
    some(pending, (item) => item.error);

  return hasSize() ? (
    <Box mb={1}>
      {!containsError() ? (
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
