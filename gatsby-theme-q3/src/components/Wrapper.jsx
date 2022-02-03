/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AuthProvider from 'q3-ui-permissions';

const setBaseUrlForRest = (
  baseURL = process.env.GATSBY_APP_BASE_URL ||
    'http://localhost:9000',
) => {
  axios.defaults.baseURL = baseURL;
  return axios.defaults;
};

const Wrapper = ({ baseURL, children }) => {
  setBaseUrlForRest(baseURL);
  return <AuthProvider>{children}</AuthProvider>;
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
