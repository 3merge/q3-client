import React from 'react';
import { browser } from 'q3-ui-helpers';

const useDragPreviewDisable = (connect) => {
  React.useEffect(() => {
    if (browser.isBrowserReady()) {
      connect(document.createElement('div'));
    }

    return () => {
      connect(null);
    };
  }, []);

  return null;
};

export default useDragPreviewDisable;
