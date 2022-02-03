import React from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import * as timezone from './timezone';
import useServer from './useServer';
import useTranslation from './useTranslation';

const Provider = ({
  children,
  addLocaleHandler,
  loadLocaleHandler,
  ...rest
}) => {
  const i18next = useServer({
    addLocaleHandler,
    loadLocaleHandler,
    ...rest,
  });

  return (
    <I18nextProvider i18n={i18next} defaultNS="en">
      {children}
    </I18nextProvider>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,

  addLocaleHandler: PropTypes.func.isRequired,
  loadLocaleHandler: PropTypes.func.isRequired,
};

export { useTranslation, timezone };
export default Provider;

// HOW TO CHANG EHTA?
