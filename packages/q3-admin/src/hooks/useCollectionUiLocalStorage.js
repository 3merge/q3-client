// eslint-disable-next-line
import React from 'react';
import { useLocation } from '@reach/router';
import { browser } from 'q3-ui-helpers';
import { compact, flatten } from 'lodash';

export default (defaultUi, uis) => {
  const { pathname } = useLocation();
  const k = `${pathname}-ui`;
  const saved = browser.proxyLocalStorageApi('getItem', k);

  return {
    cached:
      saved && compact(flatten(uis)).includes(saved)
        ? saved
        : defaultUi,

    change(nextUi) {
      browser.proxyLocalStorageApi('setItem', k, nextUi);
    },
  };
};
