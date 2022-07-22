import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'q3-ui-locale';

const AlertAuthentication = () => {
  const { t } = useTranslation('descriptions');
  return (
    <Alert severity="error">{t('cannotSeeThread')}</Alert>
  );
};

export default AlertAuthentication;
