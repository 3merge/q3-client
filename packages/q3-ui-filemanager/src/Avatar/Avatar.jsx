import React from 'react';
import Dialog from 'q3-ui-dialog';
import { browser } from 'q3-ui-helpers';
import IconButton from '@material-ui/core/IconButton';
import MuiAvatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import Drop from '../Drop';
import PhotoUpload from '../PhotoUpload';
import useStyle from './useStyle';

const AvatarPreviewComponent = ({ src }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <div className={cls.previewContainer}>
      <img
        alt={t('imageThumbnailPreview')}
        className={cls.fit}
        src={src}
      />
    </div>
  );
};

const Avatar = () => {
  return (
    <Dialog
      title="featuredPhoto"
      renderContent={() => <PhotoUpload />}
      renderTrigger={(open) => (
        <IconButton
          onClick={open}
          aria-label="Change featured photo"
        >
          <MuiAvatar alt="Image preview" />
        </IconButton>
      )}
    />
  );
};

export default Avatar;
