import React from 'react';
import { compact } from 'lodash';
import { destroySession } from 'q3-ui-permissions';
import { useAuth } from 'q3-ui-permissions';
import ProfilePhoto from '../ProfilePhoto';
import SystemPageSubArchive from '../../components/SystemPageSubArchive';
import useProfileForm from '../../hooks/useProfileForm';

const ProfileGeneral = () => {
  const { initialValues } = useProfileForm();
  const { HideByField, canCreateSub } = useAuth('profile');

  // auth here is going to take the most popular
  // it's not the best approach, but it'll do
  const items = [];

  if (canCreateSub('theme'))
    items.push({
      to: '/account/theme',
      text: 'accountThemeSettings',
    });

  if (canCreateSub('email'))
    items.push({
      to: '/account/contact',
      text: 'accoutContactInformation',
    });

  if (canCreateSub('listens'))
    items.push({
      to: '/account/notifications',
      text: 'accountNotificationSettings',
    });

  if (canCreateSub('lang'))
    items.push({
      to: '/account/locale',
      text: 'accountLocale',
    });

  return (
    <SystemPageSubArchive
      items={items.concat([
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
      ])}
      photo={
        <HideByField op="Create" path="featuredUpload">
          <ProfilePhoto />
        </HideByField>
      }
      title={compact([
        initialValues?.firstName,
        initialValues?.lastName,
      ]).join(' ')}
      subtitle={initialValues?.role}
    />
  );
};

ProfileGeneral.propTypes = {};
ProfileGeneral.defaultProps = {};

export default ProfileGeneral;
