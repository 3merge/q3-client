import React from 'react';
import PropTypes from 'prop-types';
import SearchEngine from './SearchEngine';

const PageWrapper = ({ children }) => (
  <>
    <SearchEngine />
    {children}
  </>
);

PageWrapper.defaultProps = {
  children: null,
};

PageWrapper.propTypes = {
  children: PropTypes.node,
};

export default PageWrapper;
