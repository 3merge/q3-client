import { useTranslation } from 'q3-ui-locale';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useDomainAuth from './useDomainAuth';

const useAccountPages = () => {
  const { t } = useTranslation('labels');

  const output = [
    {
      id: 'notifications',
      label: t('notifications'),
      to: 'notifications',
      icon: NotificationsIcon,
    },
    {
      id: 'account',
      label: t('profile'),
      to: 'account',
      icon: AccountBoxIcon,
    },
    {
      id: 'logout',
      label: t('logout'),
      to: 'logout',
      icon: ExitToAppIcon,
    },
  ];

  if (useDomainAuth())
    output.splice(2, 0, {
      id: 'systemSettings',
      label: t('systemSettings'),
      to: 'system',
      icon: SettingsIcon,
    });

  return output;
};

export default useAccountPages;
