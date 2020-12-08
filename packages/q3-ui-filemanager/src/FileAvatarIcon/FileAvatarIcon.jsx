import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import FileExtensions from '../FileExtensions';

const FileAvatarIcon = ({ ext, loading, ...rest }) => {
  return (
    <Avatar
      style={{
        backgroundColor: 'transparent',
        color: FileExtensions.getColor(ext),
      }}
      {...rest}
      // className={cls.avatar}
    >
      {loading && <CircularProgress />}
      {FileExtensions.getIcon(ext)}
    </Avatar>
  );
};

FileAvatarIcon.propTypes = {
  ext: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FileAvatarIcon;
