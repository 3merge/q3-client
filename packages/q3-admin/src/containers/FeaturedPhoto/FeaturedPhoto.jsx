import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, PhotoUpload } from 'q3-ui-filemanager';

export const FEATURED_UPLOAD_KEY = 'featuredUpload';

const FeaturedPhoto = ({
  component: Component,
  update,
  src,
}) => (
  <Component
    src={src}
    customizer={() => FEATURED_UPLOAD_KEY}
    onDrop={update}
    onDelete={() =>
      update({
        [FEATURED_UPLOAD_KEY]: null,
      })
    }
    style={{
      height: 75,
      width: 75,
    }}
  />
);

FeaturedPhoto.defaultProps = {
  component: PhotoUpload,
  src: '',
};

FeaturedPhoto.propTypes = {
  component: PropTypes.oneOf([Avatar, PhotoUpload]),
  src: PropTypes.string,
  update: PropTypes.func.isRequired,
};

export default FeaturedPhoto;
