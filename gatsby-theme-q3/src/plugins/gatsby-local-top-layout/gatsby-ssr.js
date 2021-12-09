/* eslint-disable import/prefer-default-export, import/no-extraneous-dependencies, react/prop-types, react/jsx-filename-extension */
import React from 'react';
import Provider from 'q3-ui';
import { i18n } from 'q3-ui-locale';
import PropTypes from 'prop-types';

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
  locale,
  ...providerProps
}) => (
  <Provider {...providerProps}>
    <LocaleBundles locale={locale}>
      {children}
    </LocaleBundles>
  </Provider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line
  locale: PropTypes.object.isRequired,
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
};

export const wrapRootElement = (
  { element },
  { locale, ...providerProps },
) => (
  <Provider {...providerProps}>
    <LocaleBundles locale={locale}>{element}</LocaleBundles>
  </Provider>
);
