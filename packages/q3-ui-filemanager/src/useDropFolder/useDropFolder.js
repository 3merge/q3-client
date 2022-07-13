import React from 'react';
import { useDrop } from 'react-dnd';
import useUploadsDirectories from '../useUploadsDirectories';
import { makeDirectoryId } from '../utils';

const useDropFolder = (path) => {
  const directories = useUploadsDirectories();
  const dataId = React.useMemo(
    () => makeDirectoryId(path, directories),
    [directories, path],
  );

  const directoryContents = dataId.split(',');
  const [collected, ref] = useDrop(() => ({
    accept: ['item', 'folder'],
    collect: (monitor) => ({
      isHovering: monitor.isOver({
        shallow: true,
      }),
    }),
    canDrop: (item) => item.id !== dataId,
    drop: (item, monitor) => ({
      itemType: monitor.getItemType(),
      path,
    }),
  }));

  return {
    ...collected,
    dataId,
    directoryContents,
    ref,
  };
};

export default useDropFolder;
