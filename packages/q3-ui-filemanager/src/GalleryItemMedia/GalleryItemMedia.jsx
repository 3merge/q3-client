import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { CardMedia, Fade } from '@material-ui/core';
import GalleryItemMediaIcon from '../GalleryItemMediaIcon';
import useVisibility from '../useVisibility';
import { getFileType, fetchUrlAsBlob } from '../utils';
import useStyle from './styles';

const GalleryItemMedia = ({ url }) => {
  const [data, setData] = React.useState(null);
  const { isVisible, ref } = useVisibility();

  const fileType = getFileType(url);
  const cls = useStyle({
    fileType,
  });

  React.useEffect(
    debounce(() => {
      if (isVisible && url)
        fetchUrlAsBlob(url)
          .then(setData)
          .catch(() => {
            // noop
          });
    }, [500]),
    [isVisible, url],
  );

  return (
    <CardMedia className={cls.media} ref={ref}>
      {data ? (
        <Fade in>
          <object
            aria-label="media preview"
            className={cls.object}
            data={data}
            height="175px"
          />
        </Fade>
      ) : (
        <GalleryItemMediaIcon url={url} />
      )}
      <div className={cls.mask} />
    </CardMedia>
  );
};

GalleryItemMedia.propTypes = {
  url: PropTypes.string.isRequired,
};

export default GalleryItemMedia;
