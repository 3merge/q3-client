import React from 'react';
import axios from 'axios';

export default () => {
  const [
    hasPendingRequests,
    setHasPendingRequests,
  ] = React.useState(false);

  const delay = (value) =>
    process.env.NODE_ENV !== 'test'
      ? setTimeout(() => setHasPendingRequests(value), 0)
      : setHasPendingRequests(value);

  axios.interceptors.request.use(
    (config) => {
      if (!hasPendingRequests) delay(true);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      if (hasPendingRequests) delay(false);
      return response;
    },
    (error) => {
      if (hasPendingRequests) delay(false);
      return Promise.reject(error);
    },
  );

  return hasPendingRequests;
};
