import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import withFileIcon from '../withFileIcon';
import useStyle from './styles';

const GalleryItemFolderIcon = React.memo(
  // eslint-disable-next-line
  withFileIcon(({ icon: Icon, iconColor }) => (
    <Icon style={{ color: iconColor }} />
  )),
);

const GalleryItemFolder = ({ name, onClick }) => {
  const cls = useStyle();

  return (
    <Card variant="outlined">
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography
            className={cls.title}
            component="p"
            variant="body2"
          >
            <GalleryItemFolderIcon isFolder />
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

GalleryItemFolder.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GalleryItemFolder;
