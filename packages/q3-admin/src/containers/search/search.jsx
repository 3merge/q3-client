import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { getSafelyForAutoCompleteWithProjection } from 'q3-ui-rest';
import { withLocation } from 'with-location';
import SearchBar from 'q3-ui/lib/searchBar';
import Box from '@material-ui/core/Box';
import { array } from 'q3-ui-helpers';
import debounce from 'debounce-promise';
import { Definitions } from '../state';
import useStyle from './useStyle';

const normalizeParams = (params) => {
  params.delete('search');
  params.delete('page');
  params.set('limit', 25);
};

const handleInterceptor = debounce(
  (promise, fn) =>
    promise
      .then((results) => (fn ? results.map(fn) : results))
      .catch(() => []),
  250,
);

const assignDirectoryPathToResults = (directoryPath) => (
  res = [],
) =>
  array.hasLength(res)
    ? res.map((item) => ({
        ...item,
        url: `${
          !directoryPath || directoryPath.endsWith('/')
            ? directoryPath
            : `${directoryPath}/`
        }${get(item, 'id', '')}`,
      }))
    : [];

export const Search = ({
  resolvers: intercept,
  params,
}) => {
  const {
    collectionName,
    resourceName,
    directoryPath,
  } = React.useContext(Definitions);
  const { root } = useStyle();

  const handleResults = React.useCallback(
    (e) => {
      normalizeParams(params);
      return handleInterceptor(
        getSafelyForAutoCompleteWithProjection(
          `/${collectionName}?${params.toString()}`,
          resourceName,
        )(e),
        intercept,
      ).then(assignDirectoryPathToResults(directoryPath));
    },
    [intercept],
  );

  return (
    <Box id="q3-searchbar" className={root}>
      <SearchBar
        getResults={handleResults}
        redirectPath={directoryPath}
      />
    </Box>
  );
};

Search.propTypes = {
  /**
   * Function that transforms REST response into the expected search result shape.
   */
  resolvers: PropTypes.func,

  /**
   * Props injected via withLocation HOC function.
   */
  params: PropTypes.shape({
    delete: PropTypes.func,
    set: PropTypes.func,
    toString: PropTypes.func,
  }).isRequired,
};

Search.defaultProps = {
  resolvers: null,
};

export default withLocation(Search);
