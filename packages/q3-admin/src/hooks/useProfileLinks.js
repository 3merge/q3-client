import { destroySession } from 'q3-ui-permissions';
import useAuthLinks from './useAuthLinks';
import { collapse } from './useDomainLinks';

export const defaultProfileLinks = [
  {
    to: '/account/password',
    text: 'accountPassword',
  },
  {
    onClick: () => {
      destroySession();
    },
    text: 'logout',
  },
];

const useProfileLinks = () =>
  collapse([
    useAuthLinks(
      'profile',
      'canCreateSub',
      [
        {
          to: '/account/theme',
          text: 'accountThemeSettings',
        },
      ],
      'theme',
    ),
    useAuthLinks(
      'profile',
      'canCreateSub',
      [
        {
          to: '/account/contact',
          text: 'accoutContactInformation',
        },
      ],
      'email',
    ),
    useAuthLinks(
      'profile',
      'canCreateSub',
      [
        {
          to: '/account/notifications',
          text: 'accountNotificationSettings',
        },
      ],
      'listens',
    ),
    useAuthLinks(
      'profile',
      'canCreateSub',
      [
        {
          to: '/account/locale',
          text: 'accountLocale',
        },
      ],
      'lang',
    ),
  ]).concat(defaultProfileLinks);

export default useProfileLinks;
