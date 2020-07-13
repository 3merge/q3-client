import React from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

export default () => {
  const [
    numberOfCallsPending,
    setNumOfCalls,
  ] = React.useState(0);

  const hasPendingRequests = numberOfCallsPending > 0;

  const delay = (fn) =>
    process.env.NODE_ENV !== 'test'
      ? debounce(() => setNumOfCalls(fn), 250)
      : setNumOfCalls(fn);

  const add = () => delay((prev) => prev + 1);
  const reduce = () => delay((prev) => prev - 1);

  axios.interceptors.request.use(
    (config) => {
      add();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      reduce();
      return response;
    },
    (error) => {
      reduce();
      return Promise.reject(error);
    },
  );

  return React.useMemo(() => hasPendingRequests, [
    hasPendingRequests,
  ]);
};
