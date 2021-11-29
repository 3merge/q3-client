import React from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import * as timezone from './timezone';
import useTranslation from './useTranslation';
import i18n from './config';

const Provider = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
};

export { i18n, useTranslation, timezone };
export default Provider;
