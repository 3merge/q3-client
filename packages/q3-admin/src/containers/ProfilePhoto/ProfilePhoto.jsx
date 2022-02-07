import React from 'react';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { PhotoUpload } from 'q3-ui-filemanager';
import FeaturedPhoto from '../FeaturedPhoto';

const ProfilePhoto = () => {
  const { state, update } = React.useContext(AuthContext);
  const src = get(state, 'profile.photo', null);

  return (
    <FeaturedPhoto
      src={src}
      update={update}
      component={PhotoUpload}
    />
  );
};

ProfilePhoto.propTypes = {};
ProfilePhoto.defaultProps = {};

export default ProfilePhoto;
