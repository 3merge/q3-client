import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  Avatar,
} from '@material-ui/core';
import classnames from 'classnames';
import CardHeader from '@material-ui/core/CardHeader';
import GalleryItemContextMenu from '../GalleryItemContextMenu';
import GalleryItemMedia from '../GalleryItemMedia';
import withFileIcon from '../withFileIcon';
import useStyle from './styles';
import withDrag from '../withDrag';
import withSelected from '../withSelected';

const GalleryItem = React.forwardRef(
  (
    {
      classes,
      id,
      icon: Icon,
      isItemSelected,
      name,
      onClick,
      onSelect,
      ...file
    },
    ref,
  ) => {
    const cls = useStyle();
    const cardClasses = classnames(
      cls.card,
      isItemSelected ? classes.item : undefined,
      'q3-file',
    );

    return (
      <GalleryItemContextMenu>
        {(onContextMenu) => (
          <Card
            data-id={id}
            className={cardClasses}
            ref={ref}
            variant="outlined"
          >
            <CardActionArea
              className={cls.item}
              onDoubleClick={onClick}
              onContextMenu={onContextMenu}
              onClick={onSelect}
            >
              <CardHeader
                classes={cls}
                avatar={
                  <Avatar>
                    <Icon />
                  </Avatar>
                }
                title={name}
              />

              <GalleryItemMedia {...file} />
            </CardActionArea>
          </Card>
        )}
      </GalleryItemContextMenu>
    );
  },
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

export default withSelected(
  withFileIcon(withDrag(GalleryItem)),
);
