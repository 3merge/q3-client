import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Tooltip,
} from '@material-ui/core';
import classnames from 'classnames';
import useDropFolder from '../useDropFolder';
import withDrag from '../withDrag';
import withFileIcon from '../withFileIcon';
import withSelected from '../withSelected';
import useStyle from './styles';
import withContextMenuFolder from '../withContextMenuFolder';
import { isTouchDevice } from '../utils';
import useLongPress from '../useLongPress';

export const GalleryItemFolderIcon = React.memo(
  // eslint-disable-next-line
  withFileIcon(({ icon: Icon }) => <Icon />),
);

// eslint-disable-next-line
export const MobileTooltip = ({ children, ...props }) =>
  !isTouchDevice() ? (
    <Tooltip {...props}>{children}</Tooltip>
  ) : (
    children
  );

const GalleryItemFolder = React.forwardRef(
  (
    { classes, id, name, onClick, onContextMenu, onSelect },
    ref,
  ) => {
    const { isHovering = false, ref: dropRef } =
      useDropFolder(id);

    const eventHandlers = useLongPress(onContextMenu);
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
        data-id={id}
        variant="outlined"
      >
        <CardActionArea
          ref={dropRef}
          onClick={onSelect}
          onDoubleClick={onClick}
          onContextMenu={onContextMenu}
          style={{ height: '100%' }}
        >
          <CardContent {...eventHandlers}>
            <MobileTooltip title={name}>
              <Typography
                className={cls.title}
                component="div"
              >
                <Avatar className={cls.avatar}>
                  <GalleryItemFolderIcon folder />
                </Avatar>
                <span>{name}</span>
              </Typography>
            </MobileTooltip>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
);

GalleryItemFolder.defaultProps = {};

GalleryItemFolder.propTypes = {
  classes: PropTypes.shape({
    item: PropTypes.string,
  }).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withContextMenuFolder(
  withSelected(withDrag(GalleryItemFolder, 'folder')),
);
