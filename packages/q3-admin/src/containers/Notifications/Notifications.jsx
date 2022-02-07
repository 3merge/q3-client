import React from 'react';
import { Box } from '@material-ui/core';
import Notifications from 'q3-ui-notifications';
import { useNotifications } from '../../hooks';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const NotificationsContainer = () => {
  const { acknowledge, data, error } = useNotifications();

  const ButtonComponent = React.useCallback(
    ({ icon, numberOfNotifications }) => (
      <Box>
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
      // we'll handle both the same way for now
      onClick={acknowledge}
      onView={acknowledge}
      buttonComponent={ButtonComponent}
    />
  );
};

export default React.memo(NotificationsContainer);
