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
import FileManagerBatchContext from '../FileManagerBatchContext';
import withDrag from '../withDrag';

const GalleryItem = React.forwardRef(
  ({ id, icon: Icon, name, onClick, ...file }, ref) => (
    <GalleryItemContextMenu>
      {(onContextMenu) => {
        const { isChecked, setChecked } = React.useContext(
          FileManagerBatchContext,
        );

        const handleSelect = () => setChecked(id);
        const cls = useStyle({
          selected: isChecked(id),
        });

        return (
          <Card
            data-id={id}
            className={classnames(cls.card, 'q3-file')}
            ref={ref}
            variant="outlined"
          >
            <CardActionArea
              onDoubleClick={onClick}
              onContextMenu={onContextMenu}
              onClick={handleSelect}
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
      }}
    </GalleryItemContextMenu>
  ),
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

export default withFileIcon(withDrag(GalleryItem));
