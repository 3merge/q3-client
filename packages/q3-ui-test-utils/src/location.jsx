import React from 'react';
import PropTypes from 'prop-types';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';

const MockLocation = ({ children, initialPath }) => {
  const source = createMemorySource(initialPath);
  const history = createHistory(source);

  return (
    <LocationProvider history={history}>
      {children}
    </LocationProvider>
  );
};

MockLocation.propTypes = {
  initialPath: PropTypes.string,

  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
};

MockLocation.defaultProps = {
  initialPath: '/',
};

export default MockLocation;
