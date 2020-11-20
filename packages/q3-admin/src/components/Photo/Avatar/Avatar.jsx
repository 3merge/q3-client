import React from 'react';
import { Avatar as FileManagerAvatar } from 'q3-ui-filemanager';
import { usePhoto } from 'q3-hooked';

const Avatar = () => {
  const { can, ...photo } = usePhoto();
  return can ? <FileManagerAvatar {...photo} /> : null;
};

export default Avatar;
