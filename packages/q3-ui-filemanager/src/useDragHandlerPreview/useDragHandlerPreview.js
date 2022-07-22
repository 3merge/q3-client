import React from 'react';
import { useDragDropManager } from 'react-dnd';

const useDragHandlerPreview = (element) => {
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();

  React.useEffect(
    () =>
      monitor.subscribeToOffsetChange(() => {
        const offset = monitor.getClientOffset();
        const setDragging = (newDragValue) =>
          element
            ? element.setAttribute(
                'data-dragging',
                newDragValue,
              )
            : null;

        try {
          if (monitor.isDragging() && element.style) {
            const { x, y } = offset;

            setDragging(true);
            // eslint-disable-next-line
            element.style.left = `${x + 5}px`;
            // eslint-disable-next-line
            element.style.top = `${y + 5}px`;
          } else {
            setDragging(false);
          }
        } catch (e) {
          setDragging(false);
        }
      }),
    [monitor],
  );
};

export default useDragHandlerPreview;
