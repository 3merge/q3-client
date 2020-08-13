import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import Drop from '../Drop';
import useStyle from './useStyle';

const PhotoUpload = ({ url }) => {
  const [previewUrl, setPreviewUrl] = React.useState(url);
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Drop
      multiple={false}
      accept=".png,.jpg,.jpeg,.svg"
      previewComponent={
        <div className={cls.previewContainer}>
          {previewUrl ? (
            <img
              alt={t('imageThumbnailPreview')}
              className={cls.fit}
              src={previewUrl}
            />
          ) : (
            <PersonIcon className={cls.fit} />
          )}
        </div>
      }
    >
      {([file]) => {
        browser.getFileThumbnail(file, (err, src) => {
          if (src) setPreviewUrl(src);
        });

        if (!file) return t('clickToSetPhoto');
        if (file.error) return t('photoFailedToUpload');
        if (file.url)
          return <Button>{t('unsetPhoto')}</Button>;

        return t('uploadingPhoto');
      }}
    </Drop>
  );
};

PhotoUpload.defaultProps = {
  url: '',
};

PhotoUpload.propTypes = {
  url: PropTypes.string,
};

export default PhotoUpload;
