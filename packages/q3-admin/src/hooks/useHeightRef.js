import { browser } from 'q3-ui-helpers';
import { get, set } from 'lodash';

const useHeightRef = () => {
  const getClientHeightById = (id) =>
    browser.isBrowserReady()
      ? get(document.getElementById(id), 'clientHeight', 0)
      : 0;

  const toPixels = (num) =>
    Number.isNaN(Number(num)) ? '0' : `${num}px`;

  return (el) => {
    const parts = [
      getClientHeightById('app-navbar'),
      getClientHeightById('app-toolbar'),
      getClientHeightById('collection-header'),
    ]
      .map(toPixels)
      .join(' - ');

    // sometimes unavailable during unmounting
    set(el, 'style.height', `calc(100vh - ${parts})`);
  };
};

export default useHeightRef;
