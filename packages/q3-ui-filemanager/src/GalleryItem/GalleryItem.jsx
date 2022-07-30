import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  Avatar,
} from '@material-ui/core';
import { omit } from 'lodash';
import classnames from 'classnames';
import CardHeader from '@material-ui/core/CardHeader';
import withContextMenu from '../withContextMenu';
import GalleryItemMedia from '../GalleryItemMedia';
import withFileIcon from '../withFileIcon';
import useStyle from './styles';
import withDrag from '../withDrag';
import withSelected from '../withSelected';
import { MobileTooltip } from '../GalleryItemFolder/GalleryItemFolder';
import useLongPress from '../useLongPress';

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

    const eventHandlers = useLongPress(onContextMenu);

    return (
      <Card
        data-id={id}
        className={cardClasses}
        ref={ref}
        variant="outlined"
        {...eventHandlers}
      >
        <CardActionArea
          className={cls.item}
          onDoubleClick={onClick}
          onContextMenu={onContextMenu}
          onClick={onSelect}
        >
          <MobileTooltip title={name}>
            <div>
              <CardHeader
                classes={omit(cls, ['card'])}
                avatar={
                  <Avatar>
                    <Icon />
                  </Avatar>
                }
                title={name}
              />
            </div>
          </MobileTooltip>
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
