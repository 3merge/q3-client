import axios from 'axios';
import { get } from 'lodash';

axios.interceptors.request.use((data) => {
  const key = data.baseURL + data.url;
  const cache = localStorage.getItem(key);
  const mod = localStorage.getItem(key);
  const { ETag } = JSON.parse(cache);

  Object.assign(data.headers.common, {
    'If-Match': ETag,
    'If-Unmodified-Since': mod,
  });

  return data;
});

axios.interceptors.response.use(
  (response) => {
    const {
      data,
      headers: { ETag },
      config: { url },
    } = response;

    localStorage.setItem(
      url,
      JSON.stringify({
        ETag,
        data,
      }),
    );
    return response;
  },
  (error) => {
    if (!error.response) return error;
    const {
      config: { url },
      status,
    } = error.response;

    if (status === 304) {
      const cache = localStorage.getItem(url);
      return cache
        ? Promise.resolve(JSON.parse(cache))
        : window.location.reload();
    }
    if (status === 412) {
      // eslint-disable-next-line
      alert('Race condition detected! Please refresh your browser to prevent data overwrites.');
    }

    return Promise.reject(get(error, 'response'));
  },
);
