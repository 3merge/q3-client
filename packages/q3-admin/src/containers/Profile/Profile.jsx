import React from 'react';
import PropTypes from 'prop-types';
import { compact } from 'lodash';
import { string } from 'q3-ui-helpers';
import ProfilePhoto from '../ProfilePhoto';
import SystemPageSubArchive from '../../components/SystemPageSubArchive';
import useProfileForm from '../../hooks/useProfileForm';
import useProfileLinks from '../../hooks/useProfileLinks';

const ProfileGeneral = ({ items }) => {
  const { initialValues } = useProfileForm();
  const profileItems = useProfileLinks();

  // always last in list
  const logout = profileItems.pop();

  return (
    <SystemPageSubArchive
      items={compact(
        profileItems.concat(items).concat(logout),
      )}
      photo={<ProfilePhoto />}
      title={string.makeName(initialValues)}
      subtitle={initialValues?.role}
    />
  );
};

ProfileGeneral.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

ProfileGeneral.defaultProps = { items: [] };

export default ProfileGeneral;
