import React from 'react';
import axios from 'axios';
import { useNotification } from 'q3-ui-forms';

const extractResponseMeta = (payload) => {
  const {
    config: { method, url },
    data,
    headers,
    status,
  } = 'response' in payload ? payload.response : payload;

  return {
    method,
    url,
    data,
    headers,
    status,
  };
};

const queryStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
};

export const handleRequest = (request) => {
  const cache = queryStorage(request.baseURL + request.url);

  return cache
    ? Object.assign(request.headers.common, {
        'If-Match': cache.ETag,
        'If-Unmodified-Since': cache['Last-Modified'],
      })
    : null;
};

export const handleResponse = (d) => {
  const {
    headers,
    method,
    status,
    data,
    url,
  } = extractResponseMeta(d);

  const startsWith = (num) =>
    String(status).startsWith(String(num));

  return {
    notify(noti) {
      if (method !== 'get' && startsWith(2)) {
        noti.onSuccess(data.message);
      } else if (startsWith(4) || startsWith(5)) {
        noti.onFail(data.message);
      }

      return this;
    },

    set() {
      localStorage.setItem(
        url,
        JSON.stringify({
          data,
          ...headers,
        }),
      );

      return this;
    },
  };
};

export const handleError = (e) => {
  const { data, status, url } = extractResponseMeta(e);
  const cache = queryStorage(url);

  return {
    notify(noti) {
      if (data && data.message && status !== 412) {
        noti.onFail(data.message);
      } else if (status === 412) {
        noti.onFail(
          'Race condition detected. Page will refresh in 5 seconds',
        );
      }

      return this;
    },

    refresh() {
      if ((status === 304 && !cache) || status === 412)
        setTimeout(() => window.location.reload(), 500);

      return cache
        ? Promise.resolve(cache)
        : Promise.reject(e.response);
    },
  };
};

export default () => {
  const [loading, setLoading] = React.useState(false);
  const noti = useNotification();

  const onRequest = React.useCallback(
    (request) => {
      setLoading(true);
      handleRequest(request);
      return request;
    },
    [loading],
  );

  const onResponse = React.useCallback(
    (response) => {
      setLoading(false);
      handleResponse(response)
        .notify(noti)
        .set();

      return response;
    },
    [loading],
  );

  const onResponseError = React.useCallback(
    (error) => {
      setLoading(false);
      return error.response
        ? handleError(error)
            .notify(noti)
            .refresh(error)
        : Promise.reject(error);
    },
    [loading],
  );

  React.useEffect(() => {
    axios.interceptors.request.use(onRequest, (error) => {
      setLoading(false);
      return error;
    });

    axios.interceptors.response.use(
      onResponse,
      onResponseError,
    );
  }, [loading]);

  return loading;
};
