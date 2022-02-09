import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';
import { isFunction } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Box from '@material-ui/core/Box';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Drop from '../Drop';
import useStyle from './useStyle';

export const FileUploadPreview = ({ src }) => {
  const { t } = useTranslation('labels');
  const [error, setError] = React.useState(false);
  const cls = useStyle();

  return (
    <Box className={cls.previewContainer}>
      {src && !error ? (
        <img
          alt={t('imageThumbnailPreview')}
          className={cls.fit}
          src={src}
          onError={() => {
            setError('true');
          }}
        />
      ) : (
        <Box className={cls.icon}>
          {error ? (
            <BrokenImageIcon />
          ) : (
            <PhotoCameraIcon />
          )}
        </Box>
      )}
    </Box>
  );
};

FileUploadPreview.defaultProps = {
  src: '',
};

FileUploadPreview.propTypes = {
  src: PropTypes.string,
};

export const FileUploadStatus = ({ file, onDelete }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  React.useEffect(() => {
    // eslint-disable-next-line
    if (file?.error) alert(t('photoFailedToUpload'));
  }, [file?.error]);

  if (file?.url && isFunction(onDelete))
    return (
      <IconButton
        id="q3-photo-remove"
        type="button"
        onClick={onDelete}
        className={cls.danger}
        aria-label={t('unsetPhoto')}
        fullWidth
      >
        <RemoveCircleIcon />
      </IconButton>
    );

  return null;
};

FileUploadStatus.defaultProps = {
  file: null,
};

FileUploadStatus.propTypes = {
  file: PropTypes.shape({
    url: PropTypes.string,
    error: PropTypes.bool,
  }),

  onDelete: PropTypes.func.isRequired,
};

const PhotoUpload = ({ src, onDelete, ...etc }) => {
  const [previewUrl, setPreviewUrl] = React.useState();

  React.useEffect(() => {
    setPreviewUrl(src);
  }, [src]);

  return (
    <Box position="relative">
      <Drop
        {...etc}
        multiple={false}
        accept=".png,.jpg,.jpeg,.svg,.jfif"
        previewComponent={
          <FileUploadPreview src={previewUrl} />
        }
      >
        {([file]) => {
          browser.getFileThumbnail(
            file,
            (err, previewSrc) => {
              if (src) setPreviewUrl(previewSrc);
            },
          );

          // allows us to "fake" the existing file blob
          return (
            <Box position="absolute" top="0" right="0">
              <FileUploadStatus
                file={file || { url: src }}
                onDelete={onDelete}
              />
            </Box>
          );
        }}
      </Drop>
    </Box>
  );
};

PhotoUpload.defaultProps = {
  src: '',
};

PhotoUpload.propTypes = {
  src: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default PhotoUpload;
