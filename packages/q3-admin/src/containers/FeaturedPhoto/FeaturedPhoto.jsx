import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, PhotoUpload } from 'q3-ui-filemanager';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(() => ({
  picture: {
    width: 95,
    height: 95,
  },
}));

export const FEATURED_UPLOAD_KEY = 'featuredUpload';

const FeaturedPhoto = ({
  component: Component,
  field,
  update,
  src,
}) => (
  <Component
    src={src}
    className={useStyle().picture}
    customizer={() => field}
    onDrop={update}
    onDelete={() =>
      update({
        [field]: null,
      })
    }
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
