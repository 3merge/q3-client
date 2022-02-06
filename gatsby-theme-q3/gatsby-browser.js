export {
  wrapPageElement,
  wrapRootElement,
} from './gatsby-ssr';

const axios = require('axios');
const { get, last, size } = require('lodash');

export const onClientEntry = async () => {
  if (typeof window === 'undefined') return;

  axios.defaults.headers['Content-Language'] =
    window.localStorage.getItem('q3-locale') || 'en';

  const { host } = window.location;
  const parts = String(host).split('.').reverse();

  if (size(parts) > 1)
    axios.defaults.headers['X-Session-Tenant'] =
      last(parts);

  await axios
    .get(
      // replace with plugin options
      'https://gist.githubusercontent.com/MikeIbberson/d1a18dcadd42447ac6a39af300518b9b/raw/417682c02b68ab98545d15fe5ffc5f8cf430db4a/Q3-manifest-default.json',
    )
    .then((resp) => {
      // eslint-disable-next-line
      window.Q3_RUNTIME_CONFIG = get(resp, 'data');
    })
    .catch((e) => {
      // eslint-disable-next-line
      console.log('Failed to load app locale:', e);
    });
};
