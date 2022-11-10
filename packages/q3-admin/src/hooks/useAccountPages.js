import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { get } from 'lodash';
import useDomainAuth from './useDomainAuth';
import ServerSideEventsContext from '../containers/ServerSideEventsContext';

const useAccountPages = () => {
  const { t } = useTranslation('labels');
  const { counters } = React.useContext(
    ServerSideEventsContext,
  );

  const output = [
    {
      label: t('notifications'),
      to: 'notifications',
      icon: NotificationsIcon,
      badge: get(counters, 'notifications', 0),
    },
    {
      label: t('profile'),
      to: 'account',
      icon: AccountBoxIcon,
    },
    {
      label: t('logout'),
      to: 'logout',
      icon: ExitToAppIcon,
    },
  ];

  if (useDomainAuth())
    output.splice(2, 0, {
      label: t('systemSettings'),
      to: 'system',
      icon: SettingsIcon,
    });

  return output;
};

export default useAccountPages;
