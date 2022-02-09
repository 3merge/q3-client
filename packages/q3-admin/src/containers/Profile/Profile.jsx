import React from 'react';
import { string } from 'q3-ui-helpers';
import ProfilePhoto from '../ProfilePhoto';
import SystemPageSubArchive from '../../components/SystemPageSubArchive';
import useProfileForm from '../../hooks/useProfileForm';
import useProfileLinks from '../../hooks/useProfileLinks';

const ProfileGeneral = () => {
  const { initialValues } = useProfileForm();
  const items = useProfileLinks();

  return (
    <SystemPageSubArchive
      items={items}
      photo={<ProfilePhoto />}
      title={string.makeName(initialValues)}
      subtitle={initialValues?.role}
    />
  );
};

ProfileGeneral.propTypes = {};
ProfileGeneral.defaultProps = {};

export default ProfileGeneral;
