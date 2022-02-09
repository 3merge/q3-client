import axios from 'axios';
import { last, size } from 'lodash';
import { getDomain } from 'q3-admin';
import { browser } from 'q3-ui-helpers';

export {
  wrapPageElement,
  wrapRootElement,
} from './gatsby-ssr';

export const onClientEntry = async () => {
  if (!browser.isBrowserReady()) return;

  // set language default
  axios.defaults.headers['Content-Language'] =
    window.localStorage.getItem('q3-locale') || 'en';

  // set tenant default
  const { host } = window.location;
  const parts = String(host).split('.').reverse();

  if (size(parts) > 1)
    axios.defaults.headers['X-Session-Tenant'] =
      last(parts);

  // calls Q3 API
  await getDomain();
};
