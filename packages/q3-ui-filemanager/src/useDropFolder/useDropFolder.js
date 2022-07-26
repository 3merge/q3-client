import React from 'react';
import { useDrop } from 'react-dnd';
import FileManagerAuthContext from '../FileManagerAuthContext';

const useDropFolder = (id) => {
  const authContext = React.useContext(
    FileManagerAuthContext,
  );

  const [collected, ref] = useDrop(() => ({
    accept: ['item', 'folder'],
    collect: (monitor) => ({
      isHovering: monitor.isOver({
        shallow: true,
      }),
    }),
    canDrop: (item) =>
      item.id !== id && authContext.canEdit,
    drop: (item, monitor) => ({
      itemType: monitor.getItemType(),
      folderId: id,
    }),
  }));

  return {
    ...collected,
    id,
    ref,
  };
};

export default useDropFolder;
