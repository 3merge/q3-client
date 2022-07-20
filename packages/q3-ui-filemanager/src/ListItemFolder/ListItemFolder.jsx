import React from 'react';
import PropTypes from 'prop-types';
import { ListItem as MuiListItem } from '@material-ui/core';
import { GalleryItemFolderIcon } from '../GalleryItemFolder/GalleryItemFolder';
import ListItemContent from '../ListItemContent';
import useDropFolder from '../useDropFolder';
import withDrag from '../withDrag';
import useStyle from './styles';
import withContextMenuFolder from '../withContextMenuFolder';
import withSelected from '../withSelected';

const ListItemFolder = React.forwardRef(
  (
    {
      isItemSelected,
      name,
      onClick,
      onContextMenu,
      onSelect,
      id,
      size,
    },
    ref,
  ) => {
    const { isHovering = false, ref: dropRef } =
      useDropFolder(id);

    const cls = useStyle({
      isHovering,
    });

    return (
      <li data-id={id} className="q3-folder" ref={dropRef}>
        <MuiListItem
          button
          component="button"
          dense
          className={cls.item}
          onClick={onSelect}
          onDoubleClick={onClick}
          onContextMenu={onContextMenu}
          selected={isItemSelected}
          ref={ref}
        >
          <ListItemContent
            onClick={onContextMenu}
            name={name}
            size={size}
          >
            <GalleryItemFolderIcon isFolder />
          </ListItemContent>
        </MuiListItem>
      </li>
    );
  },
);

ListItemFolder.defaultProps = {
  isItemSelected: false,

  size: 0,
};

ListItemFolder.propTypes = {
  isItemSelected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default withContextMenuFolder(
  withSelected(withDrag(ListItemFolder)),
);
