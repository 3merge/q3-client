import React from 'react';
import SystemPageSub from '../../components/SystemPageSub';
import NotificationsPreferences from '../NotificationsPreferences';

const ProfileNotifications = (props) => (
  <SystemPageSub title="notifications">
    <NotificationsPreferences {...props} mine />
  </SystemPageSub>
);

ProfileNotifications.propTypes = {};
ProfileNotifications.defaultProps = {};

export default ProfileNotifications;
