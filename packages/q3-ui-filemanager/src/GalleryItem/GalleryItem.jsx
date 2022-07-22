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
      icon: Icon,
      id,
      isItemSelected,
      name,
      onClick,
      onContextMenu,
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

          <GalleryItemMedia {...file}>
            <Icon />
          </GalleryItemMedia>
        </CardActionArea>
      </Card>
    );
  },
);

GalleryItem.defaultProps = {
  isItemSelected: false,
};

GalleryItem.propTypes = {
  classes: PropTypes.shape({
    item: PropTypes.string,
  }).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  isItemSelected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withContextMenu(
  withSelected(withFileIcon(withDrag(GalleryItem))),
);
