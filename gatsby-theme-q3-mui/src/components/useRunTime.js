import { browser } from 'q3-ui-helpers';
import { get } from 'lodash';

const useRunTime = () =>
  browser.isBrowserReady()
    ? get(window, 'Q3_RUNTIME_CONFIG')
    : {};

export default useRunTime;
