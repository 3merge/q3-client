import React from 'react';
import { browser } from 'q3-ui-helpers';

export default (ref, event, fn) => {
  React.useEffect(() => {
    if (!browser.isBrowserReady() || !ref) return undefined;
    ref.addEventListener(event, fn);
    fn();

    return () => {
      ref.removeEventListener(event, fn);
    };
  }, []);
};
