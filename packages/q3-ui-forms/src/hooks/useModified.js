import React from 'react';
import { browser } from 'q3-ui-helpers';

export default (isModified, disable = false) => {
  const execProxySessionStorageApi = (...params) => {
    if (!disable) browser.proxySessionStorageApi(...params);
  };

  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      execProxySessionStorageApi(
        'setItem',
        'q3-change-detection',
        String(isModified),
      );
    }, [250]);

    return () => {
      clearTimeout(timer);

      execProxySessionStorageApi(
        'removeItem',
        'q3-change-detection',
      );
    };
  }, [isModified]);
};
