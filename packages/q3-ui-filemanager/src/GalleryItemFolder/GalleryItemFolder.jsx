import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import classnames from 'classnames';
import useDropFolder from '../useDropFolder';
import withDrag from '../withDrag';
import withFileIcon from '../withFileIcon';
import withSelected from '../withSelected';
import useStyle from './styles';
import withContextMenuFolder from '../withContextMenuFolder';

export const GalleryItemFolderIcon = React.memo(
  // eslint-disable-next-line
  withFileIcon(({ icon: Icon }) => <Icon />),
);

const GalleryItemFolder = React.forwardRef(
  (
    {
      onContextMenu,
      classes,
      path,
      name,
      onClick,
      onSelect,
    },
    ref,
  ) => {
    const {
      dataId,
      isHovering = false,
      ref: dropRef,
    } = useDropFolder(path);

    const cls = useStyle({
      isHovering,
    });

    return (
      <Card
        ref={ref}
        className={classnames(
          classes.item,
          cls.card,
          'q3-folder',
        )}
        data-id={dataId}
        variant="outlined"
      >
        <CardActionArea
          ref={dropRef}
          onClick={onSelect}
          onDoubleClick={onClick}
          onContextMenu={onContextMenu}
        >
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
  },
);

GalleryItemFolder.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default withContextMenuFolder(
  withSelected(withDrag(GalleryItemFolder, 'folder')),
);
