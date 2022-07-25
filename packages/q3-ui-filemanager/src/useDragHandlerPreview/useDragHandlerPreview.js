import { useDragDropManager } from 'react-dnd';
import { get, invoke, isObject } from 'lodash';

const useDragHandlerPreview = () => {
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();

  return (element) =>
    monitor.subscribeToOffsetChange(() => {
      if (!element) return;
      const offset = monitor.getClientOffset();

      const convertOffsetToPixel = (offsetProperty) =>
        `${get(offset, offsetProperty, 0) + 5}px`;

      invoke(
        element,
        'setAttribute',
        'data-dragging',
        monitor.isDragging() && !monitor.didDrop(),
      );

      if (isObject(element?.style))
        Object.assign(element.style, {
          left: convertOffsetToPixel('x'),
          top: convertOffsetToPixel('y'),
        });
    });
};

export default useDragHandlerPreview;
