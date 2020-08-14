import React from 'react';
import Dialog from 'q3-ui-dialog';
import IconButton from '@material-ui/core/IconButton';
import MuiAvatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import Tooltip from 'q3-ui/lib/tooltip';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PhotoUpload from '../PhotoUpload';

const Avatar = (props) => {
  const { t } = useTranslation('labels');

  return (
    <Dialog
      title="featuredPhoto"
      renderContent={() => <PhotoUpload {...props} />}
      renderTrigger={(open) => (
        <Tooltip arrow title={t('changeFeaturedPhoto')}>
          <IconButton
            aria-label={t('changeFeaturedPhoto')}
            onClick={open}
          >
            <MuiAvatar {...props} alt={t('imagePreview')}>
              <PhotoCameraIcon />
            </MuiAvatar>
          </IconButton>
        </Tooltip>
      )}
    />
  );
};

export default Avatar;
