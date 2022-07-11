import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'q3-ui-locale';

const AlertNoFiles = () => {
  const { t } = useTranslation('descriptions');

  return (
    <Alert severity="warning">
      {t('fileManagerEmptyDirectory')}
    </Alert>
  );
};

export default AlertNoFiles;
