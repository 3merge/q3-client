import React from 'react';
import Provider from 'q3-ui';
import axios from 'axios';
import { i18n } from 'q3-ui-locale';
import PropTypes from 'prop-types';
import FormProviders from 'q3-ui-forms';
import AuthProvider from 'q3-ui-permissions';

const registeri18ResourceBundles = (contentData) => {
  if (!contentData || !('en' in contentData)) return;

  Object.entries(contentData).forEach(([key, bundle]) => {
    Object.entries(bundle).forEach(([namespace, data]) => {
      i18n.addResourceBundle(
        key,
        namespace,
        data,
        true,
        true,
      );
    });
  });
};

const setBaseUrlForRest = (
  baseURL = 'http://localhost:9000',
) => {
  axios.defaults.baseURL = baseURL;
  return axios.defaults;
};

const Wrapper = ({ children, baseURL, locale, theme }) => {
  setBaseUrlForRest(baseURL);
  registeri18ResourceBundles(locale);

  return (
    <Provider theme={theme}>
      <AuthProvider>
        <FormProviders preventDuplicate>
          {children}
        </FormProviders>
      </AuthProvider>
    </Provider>
  );
};

Wrapper.propTypes = {
  /**
   * The URL to set Axios calls.
   */
  baseURL: PropTypes.string.isRequired,

  /**
   * Object containing locale and namespaces to register with react-i18next.
   */
  locale: PropTypes.shape({
    en: PropTypes.object,
    fr: PropTypes.object,
  }).isRequired,

  /**
   * The entire application. This should be a top-level wrapper.
   */
  children: PropTypes.node.isRequired,

  /**
   * See Material UI's documentation for what props go into the theme obj.
   */
  theme: PropTypes.shape({
    palette: PropTypes.object,
    typography: PropTypes.object,
    overrides: PropTypes.object,
  }).isRequired,
};

export default Wrapper;
