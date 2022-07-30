import React from 'react';
import PropTypes from 'prop-types';
import { Box, CardMedia, Fade } from '@material-ui/core';
import { isObject } from 'lodash';
import useVisibility from '../useVisibility';
import { getFileType } from '../utils';
import useStyle from './styles';

const GalleryItemMedia = ({ children, url }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const { isVisible, ref } = useVisibility();
  const fileType = getFileType(url);
  const cls = useStyle({
    fileType,
  });

  const handleError = () => {
    setImageSrc(false);
  };

  React.useEffect(() => {
    const apiKey = isObject(process?.env)
      ? process.env.STORYBOOK_THUMBNAIL_API_KEY ||
        process.env.GATSBY_THUMBNAIL_API_KEY ||
        process.env.Q3_THUMBNAIL_API_KEY
      : null;

    if (apiKey && isVisible && url && !imageSrc)
      setImageSrc(
        `https://thumbnails.cloud/v1/jpg?token=${apiKey}&url=${encodeURIComponent(
          url,
        )}`,
      );
  }, [isVisible]);

  return (
    <CardMedia className={cls.media} ref={ref}>
      {imageSrc ? (
        <Fade in>
          <img
            alt="thumbnail"
            draggable={false}
            onError={handleError}
            className={cls.img}
            src={imageSrc}
          />
        </Fade>
      ) : (
        <Box className={cls.icon}>{children}</Box>
      )}
    </CardMedia>
  );
};

GalleryItemMedia.defaultProps = {
  children: null,
  url: undefined,
};

GalleryItemMedia.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  url: PropTypes.string,
};

export default GalleryItemMedia;
