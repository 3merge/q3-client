import React from 'react';
import { browser } from 'q3-ui-helpers';

export default (ref, event, fn) => {
  React.useEffect(() => {
    if (!browser.isBrowserReady() || !ref) return undefined;
    const el = document.getElementById(ref);
    if (el) {
      el.addEventListener(event, fn);
      fn();
    }

    return () => {
      el.removeEventListener(event, fn);
    };
  }, [ref]);
};
