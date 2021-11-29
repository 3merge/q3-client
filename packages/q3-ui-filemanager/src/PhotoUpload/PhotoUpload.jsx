import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Box from '@material-ui/core/Box';
import Drop from '../Drop';
import useStyle from './useStyle';

export const FileUploadPreview = ({ src }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Box className={cls.previewContainer}>
      {src ? (
        <img
          alt={t('imageThumbnailPreview')}
          className={cls.fit}
          src={src}
        />
      ) : (
        <PhotoCameraIcon className={cls.fit} />
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

  if (!file) return t('clickToSetPhoto');
  if (file.error) return t('photoFailedToUpload');
  if (file.url)
    return (
      <Box mt={-1}>
        <Button
          id="q3-photo-remove"
          type="button"
          onClick={onDelete}
          className={cls.danger}
          fullWidth
        >
          {t('unsetPhoto')}
        </Button>
      </Box>
    );

  return t('uploadingPhoto');
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
          <FileUploadStatus
            file={file || { url: src }}
            onDelete={onDelete}
          />
        );
      }}
    </Drop>
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
