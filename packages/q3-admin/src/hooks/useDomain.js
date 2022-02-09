import React from 'react';
import { get, merge } from 'lodash';
import axios from 'axios';
import { browser } from 'q3-ui-helpers';

export const getDomain = () =>
  axios
    .get('/domain')
    .then((resp) => {
      // eslint-disable-next-line
      window.Q3_RUNTIME_CONFIG = get(resp, 'data');
    })
    .catch((e) => {
      // eslint-disable-next-line
      console.log('Failed to load app locale:', e);
    });

export const getDomainDataFromResponse = (resp) =>
  get(resp, 'data.domain');

const useDomain = () => {
  const [state, setState] = React.useState({});

  const mergeWithState = (xs = {}) =>
    setState((prevState) => merge({}, prevState, xs));

  const update = (values) =>
    axios
      .post('/domain', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(getDomainDataFromResponse)
      .then(mergeWithState);

  React.useEffect(() => {
    setState(
      browser.isBrowserReady()
        ? window.Q3_RUNTIME_CONFIG
        : {},
    );
  }, []);

  return {
    domain: state,
    update,
  };
};

export default useDomain;