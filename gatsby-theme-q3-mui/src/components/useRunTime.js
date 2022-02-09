import { browser } from 'q3-ui-helpers';
import { get } from 'lodash';

// note that gatsby-theme-q3 sets this variable
// during onClientEntry
const useRunTime = () =>
  browser.isBrowserReady()
    ? get(window, 'Q3_RUNTIME_CONFIG')
    : {};

export default useRunTime;
