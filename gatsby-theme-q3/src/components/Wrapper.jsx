/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FormProviders from 'q3-ui-forms';
import AuthProvider from 'q3-ui-permissions';
import LocaleBundles from './LocaleBundles';

const setBaseUrlForRest = (
  baseURL = process.env.GATSBY_APP_BASE_URL ||
    'http://localhost:9000',
) => {
  axios.defaults.baseURL = baseURL;
  return axios.defaults;
};

const Wrapper = ({ baseURL, children, locale }) => {
  setBaseUrlForRest(baseURL);

  return (
    <LocaleBundles locale={locale}>
      <AuthProvider>
        <FormProviders preventDuplicate>
          {children}
        </FormProviders>
      </AuthProvider>
    </LocaleBundles>
  );
};

Wrapper.defaultProps = {
  baseURL: undefined,
};

Wrapper.propTypes = {
  baseURL: PropTypes.string,
  children: PropTypes.node.isRequired,

  // eslint-disable-next-line
  locale: PropTypes.object.isRequired,
};

export default Wrapper;
