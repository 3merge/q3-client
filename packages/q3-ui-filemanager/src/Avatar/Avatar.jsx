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
  const avatarProps = omit(props, [
    'customizer',
    'onDelete',
  ]);

  const AvatarRenderer = React.useMemo(
    () => (
      <MuiAvatar
        {...avatarProps}
        alt={t('imagePreview')}
        variant="rounded"
      >
        <PhotoCameraIcon />
      </MuiAvatar>
    ),
    [avatarProps],
  );

  return (
    <Dialog
      title="featuredPhoto"
      renderContent={() => <PhotoUpload {...props} />}
      renderTrigger={(open) =>
        // eslint-disable-next-line
        props?.disabled ? (
          AvatarRenderer
        ) : (
          <Tooltip arrow title={t('changeFeaturedPhoto')}>
            <IconButton
              aria-label={t('changeFeaturedPhoto')}
              onClick={open}
            >
              {AvatarRenderer}
            </IconButton>
          </Tooltip>
        )
      }
    />
  );
};

export default Avatar;
