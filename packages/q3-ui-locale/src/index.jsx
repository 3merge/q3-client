import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import {
  initReactI18next,
  I18nextProvider,
} from 'react-i18next';
import resources from './resources';
import setDeps from './deps';
import * as timezone from './timezone';

i18n.use(initReactI18next);
i18n.init(resources, setDeps);
i18n.on('languageChanged', setDeps);

const Provider = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
};

export { i18n, timezone };
export default Provider;
