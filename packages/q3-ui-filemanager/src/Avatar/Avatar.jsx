import React from 'react';
import Dialog from 'q3-ui-dialog';
import IconButton from '@material-ui/core/IconButton';
import MuiAvatar from '@material-ui/core/Avatar';
import { useTranslation } from 'q3-ui-locale';
import Tooltip from 'q3-ui/lib/tooltip';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { omit } from 'lodash';
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
            <MuiAvatar
              {...omit(props, ['customizer', 'onDelete'])}
              alt={t('imagePreview')}
              variant="rounded"
            >
              <PhotoCameraIcon />
            </MuiAvatar>
          </IconButton>
        </Tooltip>
      )}
    />
  );
};

export default Avatar;
