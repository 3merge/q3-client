import React from 'react';

export default (eventName, eventHandler) =>
  React.useEffect(() => {
    window.addEventListener(eventName, eventHandler);

    return () =>
      window.removeEventListener(eventName, eventHandler);
  }, []);
