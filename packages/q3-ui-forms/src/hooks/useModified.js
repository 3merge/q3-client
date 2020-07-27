import React from 'react';

export default (isModified, show) => {
  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (show) {
        const event = new Event('q3-change-detection');
        event.data = !isModified;
        document.dispatchEvent(event);
      }
    }, [250]);

    return () => {
      clearTimeout(timer);
    };
  }, [isModified, show]);
};
