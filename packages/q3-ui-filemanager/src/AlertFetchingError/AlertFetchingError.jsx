import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'q3-ui-locale';

const AlertFetchingError = () => {
  const { t } = useTranslation('descriptions');

  return (
    <Alert severity="error">
      {t('fileManagerFetchingError')}
    </Alert>
  );
};

export default AlertFetchingError;
