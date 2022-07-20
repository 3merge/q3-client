import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  CardMedia,
  Fade,
  CircularProgress,
} from '@material-ui/core';
import { isObject } from 'lodash';
import useVisibility from '../useVisibility';
import { getFileType } from '../utils';
import useStyle from './styles';

const GalleryItemMedia = ({ children, url }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { isVisible, ref } = useVisibility();
  const fileType = getFileType(url);
  const cls = useStyle({
    fileType,
  });

  const clearLoader = () => setLoading(false);

  const handleError = () => {
    setImageSrc(false);
  };

  React.useEffect(() => {
    const apiKey = isObject(process?.env)
      ? process.env.STORYBOOK_THUMBNAIL_API_KEY ||
        process.env.GATSBY_THUMBNAIL_API_KEY ||
        process.env.Q3_THUMBNAIL_API_KEY
      : null;

    if (apiKey && url)
      setImageSrc(
        `https://thumbnails.cloud/v1/jpg?token=${apiKey}&url=${encodeURIComponent(
          url,
        )}`,
      );
  }, []);

  return (
    <CardMedia className={cls.media} ref={ref}>
      <Fade in={isVisible}>
        {imageSrc ? (
          <>
            <img
              alt="thumbnail"
              draggable={false}
              onLoad={clearLoader}
              onError={handleError}
              className={cls.img}
              src={imageSrc}
            />
            {loading && (
              <Box
                className={cls.loader}
                position="absolute"
              >
                <CircularProgress />
              </Box>
            )}
          </>
        ) : (
          <Box className={cls.icon}>{children}</Box>
        )}
      </Fade>
    </CardMedia>
  );
};

GalleryItemMedia.defaultProps = {
  children: null,
};

GalleryItemMedia.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  url: PropTypes.string.isRequired,
};

export default GalleryItemMedia;
