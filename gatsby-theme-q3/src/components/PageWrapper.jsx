import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'q3-admin/lib/components';
import SearchEngine from './SearchEngine';
import useLocale from './useLocale';

// cannot conditionally call hooks otherwise
const Locale = () => {
  useLocale();
  return null;
};

const PageWrapper = ({
  children,
  includeLoader,
  includeLocale,
}) => (
  <>
    <SearchEngine />
    {includeLoader && <Loader />}
    {includeLocale && <Locale />}
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
