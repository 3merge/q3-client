import React from 'react';
import PropTypes from 'prop-types';
import { Box, CardMedia, Fade } from '@material-ui/core';
import useVisibility from '../useVisibility';
import { getFileType } from '../utils';
import withFileIcon from '../withFileIcon';
import useStyle from './styles';

const GalleryItemMedia = ({
  // eslint-disable-next-line
  icon: Icon,
  thumbnail,
  url,
}) => {
  const [showImage, setShowImage] = React.useState(true);
  const { isVisible, ref } = useVisibility();
  const src = thumbnail || url;
  const fileType = getFileType(url);
  const cls = useStyle({
    fileType,
  });

  const handleError = () => {
    setShowImage(false);
  };

  return (
    <CardMedia className={cls.media} ref={ref}>
      <Fade in={isVisible}>
        {showImage ? (
          <img
            alt="thumbnail"
            src={src}
            onError={handleError}
            className={cls.img}
          />
        ) : (
          <Box className={cls.icon}>
            <Icon />
          </Box>
        )}
      </Fade>
    </CardMedia>
  );
};

GalleryItemMedia.defaultProps = {
  thumbnail: null,
};

GalleryItemMedia.propTypes = {
  thumbnail: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default withFileIcon(GalleryItemMedia);
