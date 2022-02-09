import React from 'react';
import { Domain } from '../state';
import useDomain from '../../hooks/useDomain';

// eslint-disable-next-line
const DomainProvider = ({ children }) => (
  <Domain.Provider value={useDomain()}>
    {children}
  </Domain.Provider>
);

export default DomainProvider;
