import React from 'react';
import NotificationsList from 'q3-ui-notifications/lib/NotificationsList';
import useNotificationClickEvent from 'q3-ui-notifications/lib/useNotificationClickEvent';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import withPageLeave from '../../helpers/withPageLeave';
import Article from '../../components/Article';
import { useNotifications } from '../../hooks';
import useStyle from './styles';

const Notifications = React.forwardRef((props, ref) => {
  const cls = useStyle();
  const { data, clear, error, loading, syncSeen } =
    useNotifications();

  const { t } = useTranslation('labels');
  useNotificationClickEvent(data, syncSeen);

  // eslint-disable-next-line
  ref.current = syncSeen;

  return (
    <Article>
      <Box className={cls.root} py={2} mb={4}>
        <Box mt={2} mb={1}>
          <Typography variant="h1">
            {t('notifications')}
          </Typography>
        </Box>
        <NotificationsList
          showConnectivityError
          loading={loading}
          error={error}
          clear={clear}
          data={data}
        />
      </Box>
    </Article>
  );
});

export default withPageLeave(Notifications);
