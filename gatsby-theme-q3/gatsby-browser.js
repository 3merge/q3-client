import axios from 'axios';
import { last, size } from 'lodash';
import { getDomain } from 'q3-admin';

export {
  wrapPageElement,
  wrapRootElement,
} from './gatsby-ssr';

export const onClientEntry = async () => {
  if (typeof window === 'undefined') return;

  axios.defaults.headers['Content-Language'] =
    window.localStorage.getItem('q3-locale') || 'en';

  const { host } = window.location;
  const parts = String(host).split('.').reverse();

  if (size(parts) > 1)
    axios.defaults.headers['X-Session-Tenant'] =
      last(parts);

  await getDomain();
};
