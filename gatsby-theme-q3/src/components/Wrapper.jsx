import React from 'react';
import Provider from 'q3-ui';
import axios from 'axios';
import { i18n } from 'q3-ui-locale';
import PropTypes from 'prop-types';
import FormProviders from 'q3-ui-forms';
import AuthProvider from 'q3-ui-permissions';
import { Loader } from 'q3-admin/lib/components';
import SearchEngine from './SearchEngine';
import useLocale from './useLocale';

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

// cannot conditionally call hooks otherwise
const Locale = () => {
  useLocale();
  return null;
};

const Wrapper = ({
  children,
  baseURL,
  locale,
  includeLoader,
  includeLocale,
  ...providerProps
}) => {
  setBaseUrlForRest(baseURL);
  registeri18ResourceBundles(locale);

  return (
    <>
      <SearchEngine />
      <Provider {...providerProps}>
        <AuthProvider>
          <FormProviders preventDuplicate>
            {includeLoader && <Loader />}
            {includeLocale && <Locale />}
            {children}
          </FormProviders>
        </AuthProvider>
      </Provider>
    </>
  );
};

Wrapper.defaultProps = {
  baseURL: undefined,
  includeLoader: true,
  includeLocale: true,
};

Wrapper.propTypes = {
  baseURL: PropTypes.string,
  children: PropTypes.node.isRequired,
  includeLoader: PropTypes.bool,
  includeLocale: PropTypes.bool,

  // eslint-disable-next-line
  locale: PropTypes.object.isRequired,

  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
};

export default Wrapper;
