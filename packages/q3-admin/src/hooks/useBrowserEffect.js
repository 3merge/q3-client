import React from 'react';
import { browser } from 'q3-ui-helpers';
import { get } from 'lodash';

const useBrowserEffect = (fn, deps, options) => {
  const selectedHook = get(options, 'useLayout', false)
    ? React.useLayoutEffect
    : React.useEffect;

  return selectedHook(
    () => (browser.isBrowserReady() ? fn() : undefined),
    deps,
  );
};
export default useBrowserEffect;
