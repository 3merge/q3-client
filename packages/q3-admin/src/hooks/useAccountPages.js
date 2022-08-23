import { useTranslation } from 'q3-ui-locale';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useDomainAuth from './useDomainAuth';

const useAccountPages = () => {
  const { t } = useTranslation('labels');
  const output = [
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
    output.splice(1, 0, {
      label: t('systemSettings'),
      to: 'system',
      icon: SettingsIcon,
    });

  return output;
};

export default useAccountPages;
