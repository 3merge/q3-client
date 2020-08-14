import React from 'react';
import Dialog from 'q3-ui-dialog';
import IconButton from '@material-ui/core/IconButton';
import MuiAvatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import PhotoUpload from '../PhotoUpload';

const Avatar = (props) => {
  const { t } = useTranslation('labels');

  return (
    <Dialog
      title="featuredPhoto"
      renderContent={() => <PhotoUpload {...props} />}
      renderTrigger={(open) => (
        <IconButton
          aria-label={t('changeFeaturedPhoto')}
          onClick={open}
        >
          <MuiAvatar {...props} alt={t('imagePreview')} />
        </IconButton>
      )}
    />
  );
};

export default Avatar;
