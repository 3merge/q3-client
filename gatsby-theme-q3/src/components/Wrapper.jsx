import React from 'react';
import Provider from 'q3-ui';
// eslint-disable-next-line
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
  baseURL = process.env.GATSBY_APP_BASE_URL ||
    'http://localhost:9000',
) => {
  axios.defaults.baseURL = baseURL;
  return axios.defaults;
};

const LocaleBundles = ({ children, locale }) => {
  registeri18ResourceBundles(locale);
  return children;
};

LocaleBundles.defaultProps = {
  children: null,
  locale: {},
};

LocaleBundles.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  // eslint-disable-next-line
  locale: PropTypes.object,
};

const Wrapper = ({
  children,
  baseURL,
  locale,
  ...providerProps
}) => {
  setBaseUrlForRest(baseURL);

  return (
    <Provider {...providerProps}>
      <LocaleBundles locale={locale}>
        <AuthProvider>
          <FormProviders preventDuplicate>
            {children}
          </FormProviders>
        </AuthProvider>
      </LocaleBundles>
    </Provider>
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

  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
};

export default Wrapper;
