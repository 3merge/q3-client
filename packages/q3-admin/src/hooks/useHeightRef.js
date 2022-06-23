import React from 'react';
import { browser } from 'q3-ui-helpers';
import { debounce, get, set } from 'lodash';

const useHeightRef = () => {
  const ref = React.useRef();

  const getClientHeightById = (id) =>
    get(document.getElementById(id), 'clientHeight', 0);

  const toPixels = (num) =>
    Number.isNaN(Number(num)) ? '0' : `${num}px`;

  const reportWindowSize = debounce(() => {
    const parts = [
      getClientHeightById('app-navbar'),
      getClientHeightById('app-toolbar'),
      getClientHeightById('collection-header'),
    ]
      .map(toPixels)
      .join(' - ');

    // sometimes unavailable during unmounting
    set(
      ref,
      'current.style.height',
      `calc(100vh - ${parts})`,
    );
  }, 1);

  React.useLayoutEffect(() => {
    if (!browser.isBrowserReady()) return undefined;

    window.addEventListener('resize', reportWindowSize);
    reportWindowSize();

    return () => {
      window.removeEventListener(
        'resize',
        reportWindowSize,
      );
    };
  }, []);

  return ref;
};

export default useHeightRef;
