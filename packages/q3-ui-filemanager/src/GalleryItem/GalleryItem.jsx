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
          <Icon /> {name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

GalleryItem.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withFileIcon(GalleryItem);
