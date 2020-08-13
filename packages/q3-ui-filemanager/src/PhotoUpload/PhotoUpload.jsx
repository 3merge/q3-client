import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import Drop from '../Drop';
import useStyle from './useStyle';

export const FileUploadPreview = ({ src }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <div className={cls.previewContainer}>
      {src ? (
        <img
          alt={t('imageThumbnailPreview')}
          className={cls.fit}
          src={src}
        />
      ) : (
        <PersonIcon className={cls.fit} />
      )}
    </div>
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

  if (!file) return t('clickToSetPhoto');
  if (file.error) return t('photoFailedToUpload');
  if (file.url)
    return (
      <Button type="button" onClick={onDelete}>
        {t('unsetPhoto')}
      </Button>
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
  const [previewUrl, setPreviewUrl] = React.useState(src);

  return (
    <Drop
      {...etc}
      multiple={false}
      accept=".png,.jpg,.jpeg,.svg"
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
