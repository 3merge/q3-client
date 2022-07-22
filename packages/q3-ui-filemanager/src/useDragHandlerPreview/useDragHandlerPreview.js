import React from 'react';
import { useDragDropManager } from 'react-dnd';
import { get, invoke, isObject } from 'lodash';

const useDragHandlerPreview = (element) => {
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();

  React.useEffect(
    () =>
      monitor.subscribeToOffsetChange(() => {
        if (!element) return;
        const offset = monitor.getClientOffset();

        const convertOffsetToPixel = (offsetProperty) =>
          `${get(offset, offsetProperty, 0) + 5}px`;

        invoke(
          element,
          'setAttribute',
          'data-dragging',
          monitor.isDragging(),
        );

        if (isObject(element?.style))
          Object.assign(element.style, {
            left: convertOffsetToPixel('x'),
            top: convertOffsetToPixel('y'),
          });
      }),
    [monitor],
  );
};

export default useDragHandlerPreview;
