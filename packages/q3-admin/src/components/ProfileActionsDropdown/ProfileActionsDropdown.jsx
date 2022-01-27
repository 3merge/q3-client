import React from 'react';
import { Box } from '@material-ui/core';
import { destroySession } from 'q3-ui-permissions';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import AppHeaderDropdown from '../AppHeaderDropdown';

export const PROFILE_PATH = 'account/profile';
export const NOTIFICATIONS_PATH = 'account/notifications';
export const PASSWORD_PATH = 'account/change-password';

const ProfileActionsDropdown = () => {
  const { state } = React.useContext(AuthContext);

  return (
    <Box>
      <AppHeaderDropdown
        src={get(state, 'profile.photo')}
        items={[
          {
            label: 'profile',
            to: PROFILE_PATH,
          },
          {
            label: 'notifications',
            to: NOTIFICATIONS_PATH,
          },
          {
            divider: true,
          },
          {
            label: 'changePassword',
            to: PASSWORD_PATH,
          },
          {
            label: 'logout',
            onClick: () => destroySession(),
          },
        ]}
      />
    </Box>
  );
};

export default ProfileActionsDropdown;
