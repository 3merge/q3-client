import React from 'react';
import PropTypes from 'prop-types';
import { getSafelyForAutoCompleteWithProjection } from 'q3-ui-rest';
import { withLocation } from 'with-location';
import SearchBar from 'q3-ui/lib/searchBar';
import Box from '@material-ui/core/Box';
import { Definitions } from '../state';
import useStyle from './useStyle';

const normalizeParams = (params) => {
  params.delete('search');
  params.delete('page');
  params.set('limit', 25);
};

const handleInterceptor = (promise, fn) =>
  promise
    .then((results) => (fn ? results.map(fn) : fn))
    .catch(() => []);

export const Search = ({ intercept, params }) => {
  const { root } = useStyle();
  const {
    collectionName,
    resourceName,
    directoryPath,
  } = React.useContext(Definitions);

  const handleResults = React.useCallback(
    (e) => {
      normalizeParams(params);
      return handleInterceptor(
        getSafelyForAutoCompleteWithProjection(
          `/${collectionName}?${params.toString()}`,
          resourceName,
        )(e),
        intercept,
      );
    },
    [intercept],
  );

  return (
    <Box className={root}>
      <SearchBar
        getResults={handleResults}
        redirectPath={directoryPath}
      />
    </Box>
  );
};

/**
 * Intercept data post-REST op.
 * Use this to modify search results pre-init q3-ui/lib/searchBar.
 */
Search.propTypes = {
  intercept: PropTypes.func.isRequired,
  params: PropTypes.shape({
    delete: PropTypes.func,
    set: PropTypes.func,
    toString: PropTypes.func,
  }).isRequired,
};

export default withLocation(Search);
