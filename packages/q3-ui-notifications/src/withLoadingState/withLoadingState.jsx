import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'q3-ui-locale';
import { size } from 'lodash';
import NotificationsDescription from '../NotificationsDescription';

const withLoadingState = (Component) => (props) => {
  const { t } = useTranslation('descriptions');
  // eslint-disable-next-line
  const { data, error, loading, showConnectivityError } =
    props;

  const msgs = size(data);

  if (error && !msgs)
    return (
      <NotificationsDescription text="notificationsError" />
    );

  if (loading)
    return (
      <NotificationsDescription text="notificationsLoading" />
    );

  return (
    <>
      {error && showConnectivityError && (
        <Box mb={1.5}>
          <Alert severity="error">
            {t('notificationsConnectivityError')}
          </Alert>
        </Box>
      )}
      <Component {...props} />
    </>
  );
};

export default withLoadingState;
