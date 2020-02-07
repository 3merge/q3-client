import React from 'react';
import PropTypes from 'prop-types';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';

const MockLocation = ({
  children,
  initialPath,
  search,
}) => {
  const source = createMemorySource(initialPath);
  const history = createHistory(source);

  React.useEffect(() => {
    if (search) history.navigate(search);
  }, []);

  return (
    <LocationProvider history={history}>
      {children}
    </LocationProvider>
  );
};

MockLocation.propTypes = {
  initialPath: PropTypes.string,
  search: PropTypes.string,

  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
};

MockLocation.defaultProps = {
  initialPath: '/',
  search: null,
};

export default MockLocation;
