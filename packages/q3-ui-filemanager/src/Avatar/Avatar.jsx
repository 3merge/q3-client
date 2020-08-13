import React from 'react';
import Dialog from 'q3-ui-dialog';
import IconButton from '@material-ui/core/IconButton';
import MuiAvatar from '@material-ui/core/Avatar';
import PhotoUpload from '../PhotoUpload';

const Avatar = (props) => (
  <Dialog
    title="featuredPhoto"
    renderContent={() => <PhotoUpload {...props} />}
    renderTrigger={(open) => (
      <IconButton
        onClick={open}
        aria-label="Change featured photo"
      >
        <MuiAvatar {...props} alt="Image preview" />
      </IconButton>
    )}
  />
);

export default Avatar;
