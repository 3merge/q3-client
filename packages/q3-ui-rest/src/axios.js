import React from 'react';
import axios from 'axios';
import { get } from 'lodash';

export const getCached = (data) => {
  const key = data.baseURL + data.url;
  const cache = localStorage.getItem(key);

  if (cache) {
    const { ETag, 'Last-Modified': mod } = JSON.parse(
      cache,
    );
    Object.assign(data.headers.common, {
      'If-Match': ETag,
      'If-Unmodified-Since': mod,
    });
  }

  return data;
};

export const fromCache = (response) => {
  const {
    data,
    headers,
    config: { url },
  } = response;

  localStorage.setItem(
    url,
    JSON.stringify({
      ...headers,
      data,
    }),
  );

  return response;
};

export const useCache = (error) => {
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
};

axios.interceptors.request.use(getCached);
axios.interceptors.response.use(fromCache, useCache);

export const useLoading = () => {
  const [loading, setLoading] = React.useState();

  axios.interceptors.request.use(
    (config) => {
      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
      return error;
    },
  );

  axios.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    },
  );

  return loading;
};
