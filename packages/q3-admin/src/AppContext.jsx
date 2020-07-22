import React from 'react';
import PropTypes from 'prop-types';

export const Context = React.createContext({
  enable: true,
});

const AppContext = ({ children, appConfigDefaults }) => (
  <Context.Provider value={appConfigDefaults}>
    {children}
  </Context.Provider>
);

AppContext.propTypes = {
  appConfigDefaults: PropTypes.shape({
    enable: PropTypes.bool,
  }),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
};

AppContext.defaultProps = {
  appConfigDefaults: {
    enable: true,
  },
};

export default AppContext;
