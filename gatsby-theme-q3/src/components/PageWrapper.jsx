import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'q3-admin/lib/components';
import SearchEngine from './SearchEngine';

const PageWrapper = ({ children, includeLoader }) => (
  <>
    <SearchEngine />
    {includeLoader && <Loader />}
    {children}
  </>
);

PageWrapper.defaultProps = {
  children: null,
  includeLoader: true,
  includeLocale: true,
};

PageWrapper.propTypes = {
  children: PropTypes.node,
  includeLoader: PropTypes.bool,
  includeLocale: PropTypes.bool,
};

export default PageWrapper;
