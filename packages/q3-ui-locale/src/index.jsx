import React from 'react';
import PropTypes from 'prop-types';
import * as timezone from './timezone';
import useLanguage from './useLanguage';
import useServer from './useServer';
import useTranslation from './useTranslation';
import Context from './context';

const Provider = ({ children, fallback, ...rest }) => {
  const i18next = useServer(rest);

  return i18next ? (
    <Context.Provider value={i18next}>
      {children}
    </Context.Provider>
  ) : null;
};

Provider.defaultProps = {
  fallback: '',
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,

  // no longer using static resources
  addLocaleHandler: PropTypes.func.isRequired,
  loadLocaleHandler: PropTypes.func.isRequired,
  fallback: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

export { useLanguage, useTranslation, timezone };
export default React.memo(Provider);
