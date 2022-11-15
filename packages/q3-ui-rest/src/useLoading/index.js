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

export const handleResponse = (d) => {
  const { method, status, data } = extractResponseMeta(d);

  const startsWith = (num) =>
    String(status).startsWith(String(num));

  return {
    notify(noti) {
      if (
        method !== 'get' &&
        startsWith(2) &&
        data?.message
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

  const onRequest = (request) => {
    setLoading(true);
    return request;
  };

  const onRequestError = (error) => {
    setLoading(false);
    return error;
  };

  const onResponse = (response) => {
    setLoading(false);
    handleResponse(response).notify(noti).set();
    return response;
  };

  const onResponseError = (error) => {
    setLoading(false);
    try {
      return handleError(error).notify(noti).refresh(error);
    } catch (e) {
      return Promise.reject(error);
    }
  };

  React.useEffect(() => {
    const req = axios.interceptors.request.use(
      onRequest,
      onRequestError,
    );

    const res = axios.interceptors.response.use(
      onResponse,
      onResponseError,
    );

    return () => {
      axios.interceptors.request.eject(req);
      axios.interceptors.response.eject(res);
    };
  }, [loading]);

  return loading;
};
