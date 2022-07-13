import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  Avatar,
} from '@material-ui/core';
import classnames from 'classnames';
import CardHeader from '@material-ui/core/CardHeader';
import withContextMenu from '../withContextMenu';
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
      onContextMenu,
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
  onContextMenu: PropTypes.func.isRequired,
};

export default withContextMenu(
  withSelected(withFileIcon(withDrag(GalleryItem))),
);
