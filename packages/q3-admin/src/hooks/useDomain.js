import React from 'react';
import { get, merge, isObject } from 'lodash';
import axios from 'axios';
import { browser } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';

export const getDomainDataFromResponse = (resp) =>
  get(resp, 'data.domain');

export const getDomain = () =>
  axios
    .get('/domain')
    .then(getDomainDataFromResponse)
    .then((resp) => {
      // eslint-disable-next-line
      window.Q3_RUNTIME_CONFIG = resp;
    })
    .catch((e) => {
      // eslint-disable-next-line
      console.log('Failed to load domain settings:', e);
    });

const useDomain = () => {
  const [state, setState] = React.useState({});
  const { t } = useTranslation('descriptions');

  const mergeWithState = (xs = {}) =>
    setState((prevState) => merge({}, prevState, xs));

  const update = (values = {}) => {
    if (values instanceof FormData) {
      values.set('sensitive', false);
    } else if (isObject(values)) {
      Object.assign(values, {
        sensitive: false,
      });
    }

    return axios
      .post('/domain', values)
      .then(getDomainDataFromResponse)
      .then(mergeWithState)
      .then(() => ({
        message: t('domainUpdated'),
      }));
  };

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
