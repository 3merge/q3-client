import React from 'react';
import { get } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import { AuthContext } from 'q3-ui-permissions';
import { PhotoUpload } from 'q3-ui-filemanager';
import FeaturedPhoto from '../FeaturedPhoto';

const ProfilePhoto = () => {
  const { state, update } = React.useContext(AuthContext);
  const src = get(state, 'profile.photo', null);
  const { HideByField } = useAuth('profile');

  return (
    <HideByField op="Create" path="featuredUpload">
      <FeaturedPhoto
        src={src}
        update={update}
        component={PhotoUpload}
      />
    </HideByField>
  );
};

ProfilePhoto.propTypes = {};
ProfilePhoto.defaultProps = {};

export default ProfilePhoto;
