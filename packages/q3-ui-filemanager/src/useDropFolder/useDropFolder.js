import { useDrop } from 'react-dnd';

const useDropFolder = (id) => {
  const [collected, ref] = useDrop(() => ({
    accept: ['item', 'folder'],
    collect: (monitor) => ({
      isHovering: monitor.isOver({
        shallow: true,
      }),
    }),
    canDrop: (item) => item.id !== id,
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
