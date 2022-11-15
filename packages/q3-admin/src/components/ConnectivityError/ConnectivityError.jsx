import React from 'react';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'q3-ui-locale';
import ServerSideEventsContext from '../../containers/ServerSideEventsContext';

const ConnectivityError = () => {
  const { error } = React.useContext(
    ServerSideEventsContext,
  );

  const { t } = useTranslation('descriptions');

  return error ? (
    <Box mb={1.5}>
      <Alert severity="error">
        {t('notificationsConnectivityError')}
      </Alert>
    </Box>
  ) : null;
};

export default ConnectivityError;
