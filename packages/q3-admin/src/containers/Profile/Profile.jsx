import React from 'react';
import { compact } from 'lodash';
import { destroySession } from 'q3-ui-permissions';
import ProfilePhoto from '../ProfilePhoto';
import SystemPageSubArchive from '../../components/SystemPageSubArchive';
import useProfileForm from '../../hooks/useProfileForm';

const ProfileGeneral = () => {
  const { initialValues } = useProfileForm();

  return (
    <SystemPageSubArchive
      items={[
        {
          to: '/account/theme',
          text: 'accountThemeSettings',
        },
        {
          to: '/account/contact',
          text: 'accoutContactInformation',
        },
        {
          to: '/account/notifications',
          text: 'accountNotificationSettings',
        },
        {
          to: '/account/locale',
          text: 'accountLocale',
        },
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
      ]}
      photo={<ProfilePhoto />}
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
