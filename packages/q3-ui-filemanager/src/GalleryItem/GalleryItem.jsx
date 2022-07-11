import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import GalleryItemMedia from '../GalleryItemMedia';
import withFileIcon from '../withFileIcon';

const GalleryItem = ({
  icon: Icon,
  iconColor,
  name,
  onClick,
  onContextMenu,
  ...file
}) => (
  <Card variant="outlined">
    <CardActionArea
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <GalleryItemMedia {...file} />
      <CardContent>
        <Typography
          component="p"
          variant="body1"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Icon style={{ color: iconColor }} /> {name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

GalleryItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withFileIcon(GalleryItem);
