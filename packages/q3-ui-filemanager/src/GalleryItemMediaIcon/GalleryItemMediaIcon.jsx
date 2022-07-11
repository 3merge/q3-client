import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@material-ui/core';
import withFileIcon from '../withFileIcon';
import useStyle from './styles';

const GalleryItemMediaIcon = ({
  fileType,
  icon: Icon,
  iconColor,
}) => {
  const cls = useStyle({
    color: iconColor,
  });

  return (
    <>
      <Icon className={cls.icon} />
      {fileType && (
        <Box position="absolute" bottom="35%" right="35%">
          <Chip label={fileType} size="small" />
        </Box>
      )}
    </>
  );
};

GalleryItemMediaIcon.propTypes = {
  fileType: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  iconColor: PropTypes.string.isRequired,
};

export default withFileIcon(GalleryItemMediaIcon);
