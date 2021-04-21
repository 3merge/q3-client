import React from 'react';
import { IconButton } from '@material-ui/core';
import Files from 'react-butterfiles';
import PermMediaIcon from '@material-ui/icons/PermMedia';

const MediaUpload = React.forwardRef((props, ref) => {
  const { upload } = props;

  return (
    <Files
      maxSize="10mb"
      onSuccess={(data) =>
        upload(data).then((url) => {
          ref.current.insertEmbed(
            ref.current.getLength(),
            'image',
            url,
          );
        })
      }
      onError={() => {
        alert('uploadFailed.');
      }}
    >
      {({ browseFiles }) => (
        <IconButton onClick={browseFiles}>
          <PermMediaIcon />
        </IconButton>
      )}
    </Files>
  );
});

export default MediaUpload;
