import React from 'react';
import { debounce, get, set } from 'lodash';
import useBrowserEffect from './useBrowserEffect';

const useHeightRef = () => {
  const ref = React.useRef();

  const getClientHeightById = (id) =>
    get(document.getElementById(id), 'offsetHeight', 0);

  const toPixels = (num) =>
    Number.isNaN(Number(num)) ? '0' : `${num}px`;

  const reportWindowSize = debounce(() => {
    const parts = [
      getClientHeightById('app-navbar'),
      getClientHeightById('app-toolbar'),
      getClientHeightById('collection-header'),
      1,
    ]
      .map(toPixels)
      .join(' - ');

    // sometimes unavailable during unmounting
    set(
      ref,
      'current.style.height',
      `calc((100 * var(--vh)) - ${parts})`,
    );
  }, 1);

  useBrowserEffect(
    () => {
      window.addEventListener('resize', reportWindowSize);
      window.addEventListener(
        'orientationchange',
        reportWindowSize,
        false,
      );

      reportWindowSize();

      return () => {
        window.removeEventListener(
          'resize',
          reportWindowSize,
        );

        window.removeEventListener(
          'orientationchange',
          reportWindowSize,
        );
      };
    },
    [],
    {
      useLayout: true,
    },
  );

  return ref;
};

export default useHeightRef;
