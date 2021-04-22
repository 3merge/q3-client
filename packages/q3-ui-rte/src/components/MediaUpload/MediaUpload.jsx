import React from 'react';
import { IconButton } from '@material-ui/core';
import Files from 'react-butterfiles';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { first } from 'lodash';

const MediaUpload = React.forwardRef((props, ref) => {
  const { component: Component, upload } = props;

  return (
    <Files
      maxSize="10mb"
      onSuccess={(data) =>
        upload(first(data)).then((url) => {
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
      {({ browseFiles }) =>
        Component ? (
          <Component
            icon={PermMediaIcon}
            onClick={browseFiles}
          />
        ) : (
          <IconButton onClick={browseFiles}>
            <PermMediaIcon />
          </IconButton>
        )
      }
    </Files>
  );
});

export default MediaUpload;
