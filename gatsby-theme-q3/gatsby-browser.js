import axios from 'axios';
import { size } from 'lodash';
import { getDomain } from 'q3-admin';
import { browser } from 'q3-ui-helpers';

export {
  wrapPageElement,
  wrapRootElement,
} from './gatsby-ssr';

export const onClientEntry = async () => {
  if (!browser.isBrowserReady()) return;

  // set api default root
  axios.defaults.baseURL =
    process.env.GATSBY_APP_BASE_URL ||
    'http://localhost:9000';

  // set language default
  axios.defaults.headers['Content-Language'] =
    window.localStorage.getItem('q3-locale') || 'en';

  // set tenant default
  const { host } = window.location;
  const str = String(host);
  const offset = str.includes('localhost') ? -1 : -2;
  const parts = str.split('.').slice(0, offset).join('.');

  if (size(parts))
    axios.defaults.headers['X-Session-Tenant'] = parts;

  // calls Q3 API
  await getDomain();
};
