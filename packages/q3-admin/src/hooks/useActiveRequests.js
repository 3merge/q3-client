import React from 'react';
import axios from 'axios';

export default () => {
  const [
    numberOfCallsPending,
    setNumOfCalls,
  ] = React.useState(0);

  const delay = (fn) =>
    setTimeout(() => {
      setNumOfCalls(fn);
    }, 250);

  const add = () => delay((prev) => prev + 1);
  const reduce = () => delay((prev) => prev - 1);

  axios.interceptors.request.use(
    (config) => {
      add();
      return config;
    },
    (error) => Promise.reject(error),
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

  return numberOfCallsPending;
};
