import React from 'react';
import { browser } from 'q3-ui-helpers';

export default (isModified) => {
  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      browser.proxySessionStorageApi(
        'setItem',
        'q3-change-detection',
        String(isModified),
      );
    }, [250]);

    return () => {
      clearTimeout(timer);

      browser.proxySessionStorageApi(
        'removeItem',
        'q3-change-detection',
      );
    };
  }, [isModified]);
};
