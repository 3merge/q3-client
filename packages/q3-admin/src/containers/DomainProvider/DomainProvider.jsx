import React from 'react';
import PropTypes from 'prop-types';
import { Domain } from '../state';
import useDomain from '../../hooks/useDomain';

const DomainProvider = ({ children, directory }) => {
  const d = useDomain();
  const value = React.useMemo(
    () => ({
      directory,
      ...d,
    }),
    [d],
  );

  return (
    <Domain.Provider value={value}>
      {children}
    </Domain.Provider>
  );
};

DomainProvider.defaultProps = {
  directory: '/',
};

DomainProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  directory: PropTypes.string,
};

export default DomainProvider;
