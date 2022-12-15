import React from 'react';
import * as browser from '../browser';

const useBrowserLayoutEffect = (callback, deps = []) =>
  React.useLayoutEffect(
    () =>
      browser.isBrowserReady() ? callback() : undefined,
    deps,
  );

export default useBrowserLayoutEffect;
