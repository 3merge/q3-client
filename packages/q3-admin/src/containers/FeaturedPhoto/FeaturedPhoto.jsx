import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, PhotoUpload } from 'q3-ui-filemanager';

export const FEATURED_UPLOAD_KEY = 'featuredUpload';

const FeaturedPhoto = ({
  component: Component,
  field,
  update,
  src,
}) => (
  <Component
    src={src}
    customizer={() => field}
    onDrop={update}
    onDelete={() =>
      update({
        [field]: null,
      })
    }
    style={{
      height: 125,
      width: 125,
    }}
  />
);

FeaturedPhoto.defaultProps = {
  component: PhotoUpload,
  field: FEATURED_UPLOAD_KEY,
  src: '',
};

FeaturedPhoto.propTypes = {
  component: PropTypes.oneOf([Avatar, PhotoUpload]),
  field: PropTypes.string,
  src: PropTypes.string,
  update: PropTypes.func.isRequired,
};

export default FeaturedPhoto;
