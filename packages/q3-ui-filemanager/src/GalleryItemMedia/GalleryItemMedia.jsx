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
import withFileIcon from '../withFileIcon';
import useStyle from './styles';

const GalleryItemMedia = ({
  // eslint-disable-next-line
  icon: Icon,
  url,
}) => {
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
          <Box className={cls.icon}>
            <Icon />
          </Box>
        )}
      </Fade>
    </CardMedia>
  );
};

GalleryItemMedia.defaultProps = {};

GalleryItemMedia.propTypes = {
  url: PropTypes.string.isRequired,
};

export default withFileIcon(GalleryItemMedia);
