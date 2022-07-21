import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'q3-ui-locale';

const AlertEmpty = () => {
  const { t } = useTranslation('descriptions');
  return (
    <Alert severity="warning">{t('threadEmpty')}</Alert>
  );
};

export default AlertEmpty;
