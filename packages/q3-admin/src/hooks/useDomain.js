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

const useDomain = () => {
  const [state, setState] = React.useState({});

  const update = (values) =>
    axios
      .post('/domain', values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => {
        setState((prevState) =>
          // ensure new object
          merge({}, prevState, get(resp, 'data.domain')),
        );
      });

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
