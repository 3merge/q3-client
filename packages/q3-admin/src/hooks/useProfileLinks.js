import { destroySession } from 'q3-ui-permissions';
import useAuthLinks from './useAuthLinks';
import { collapse } from './useDomainLinks';

const useProfileLinks = () =>
  collapse([
    useAuthLinks(
      'profile',
      'canCreateSub',
      [
        {
          to: '/account/contact',
          text: 'accountContactInformation',
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
    useAuthLinks('profile', 'canCreate', [
      {
        to: '/account/password',
        text: 'accountPassword',
      },
    ]),
  ]).concat({
    onClick: () => {
      destroySession();
    },
    text: 'logout',
  });

export default useProfileLinks;
