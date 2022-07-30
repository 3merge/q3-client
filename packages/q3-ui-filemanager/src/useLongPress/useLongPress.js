import { useDragDropManager } from 'react-dnd';
import { useLongPress } from 'use-long-press';

const useLongPressImplementation = (callback) => {
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();

  const bind = useLongPress(
    (event) => {
      if (!monitor.isDragging()) callback(event);
    },

    {
      cancelOnMovement: 10,
      threshold: 1000,
    },
  );

  return bind();
};

export default useLongPressImplementation;
