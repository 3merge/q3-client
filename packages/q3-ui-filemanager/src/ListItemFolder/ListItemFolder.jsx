import React from 'react';
import { GalleryItemFolderIcon } from '../GalleryItemFolder/GalleryItemFolder';
import { ListItem } from '../ListItem/ListItem';

const ListItemFolder = (props) => (
  <ListItem
    // eslint-disable-next-line
    icon={() => <GalleryItemFolderIcon isFolder />}
    {...props}
  />
);

export default ListItemFolder;
