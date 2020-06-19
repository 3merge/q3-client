import React from 'react';
import axios from 'axios';
import { useNotification } from 'q3-ui-forms';

const extractResponseMeta = (payload) => {
  const { config, data, headers, status } =
    'response' in payload ? payload.response : payload;

  const output = {
    data,
    headers,
    status,
  };

  if (config)
    Object.assign(output, {
      method: config.method,
      url: config.url,
    });

  return output;
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
  const { method, status, data } = extractResponseMeta(d);

  const startsWith = (num) =>
    String(status).startsWith(String(num));

  return {
    notify(noti) {
      if (
        method !== 'get' &&
        startsWith(2) &&
        data.message
      ) {
        noti.onSuccess(data.message);
      } else if (startsWith(4) || startsWith(5)) {
        noti.onFail(data.message);
      }

      return this;
    },

    set() {
      return this;
    },
  };
};

export const handleError = (e) => {
  const { data, status } = extractResponseMeta(e);

  return {
    notify(noti) {
      if (status === 412) {
        noti.onFail('Race condition detected (412)');
      } else if (data && data.message && status !== 404) {
        noti.onFail(data.message);
      }

      return this;
    },

    refresh() {
      return Promise.reject(e);
    },
  };
};

export default () => {
  const [loading, setLoading] = React.useState(false);
  const noti = useNotification();

  const onRequest = React.useCallback(
    (request) => {
      setLoading(true);
      // handleRequest(request);
      return request;
    },
    [loading],
  );

  const onResponse = React.useCallback(
    (response) => {
      setLoading(false);
      handleResponse(response).notify(noti).set();

      return response;
    },
    [loading],
  );

  const onResponseError = React.useCallback(
    (error) => {
      setLoading(false);
      try {
        return handleError(error)
          .notify(noti)
          .refresh(error);
      } catch (e) {
        return Promise.reject(error);
      }
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
