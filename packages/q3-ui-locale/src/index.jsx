import React from 'react';
import PropTypes from 'prop-types';
import * as timezone from './timezone';
import useServer from './useServer';
import useTranslation from './useTranslation';
import Context from './context';

const Provider = ({ children, ...rest }) => {
  const i18next = useServer(rest);

  return (
    <Context.Provider value={i18next}>
      {children}
    </Context.Provider>
  );
};

Provider.defaultProps = {
  lng: 'en',
  supportedLngs: ['en'],
  resources: {},
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  lng: PropTypes.string,
  resources: PropTypes.shape({
    // eslint-disable-next-line
    descriptions: PropTypes.object,
    // eslint-disable-next-line
    helpers: PropTypes.object,
    // eslint-disable-next-line
    labels: PropTypes.object,
    // eslint-disable-next-line
    titles: PropTypes.object,
  }),
  supportedLngs: PropTypes.arrayOf(PropTypes.string),
};

export default React.memo(Provider);
export { useTranslation, timezone };
