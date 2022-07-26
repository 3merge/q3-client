import React from 'react';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { PhotoUpload } from 'q3-ui-filemanager';

const ProfilePhoto = () => {
  const { state, update } = React.useContext(AuthContext);
  const src = get(state, 'profile.photo', null);

  return (
    <PhotoUpload
      collectionName="profile"
      src={src}
      upload={update}
    />
  );
};

ProfilePhoto.propTypes = {};
ProfilePhoto.defaultProps = {};

export default ProfilePhoto;
