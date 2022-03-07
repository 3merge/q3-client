import React from 'react';
import { Box } from '@material-ui/core';
import Notifications from 'q3-ui-notifications';
import { useNotifications } from '../../hooks';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const NotificationsContainer = () => {
  const { data, syncSeen, error } = useNotifications({
    numberOfDays: 7,
  });

  const ButtonComponent = React.useCallback(
    ({ icon, numberOfNotifications }) => (
      <Box display="inline-block" width="100%">
        <ButtonWithIcon
          icon={icon}
          label="notifications"
          count={numberOfNotifications}
        />
      </Box>
    ),
    [],
  );

  return (
    <Notifications
      data={data}
      error={error}
      syncSeen={syncSeen}
      buttonComponent={ButtonComponent}
    />
  );
};

export default React.memo(NotificationsContainer);
