import React from 'react';
import PropTypes from 'prop-types';
import { getForAutocomplete } from 'q3-ui-rest';
import SearchBar from 'q3-ui/lib/searchBar';
import { Search as SearchIcon } from 'q3-ui-assets';
import { Definitions } from '../containers/state';
import { runFn, assembleSearchQuery } from './utils';

const Search = ({ intercept }) => {
  const { collectionName, resourceName } = React.useContext(
    Definitions,
  );

  const handleResults = React.useCallback(
    (e) =>
      getForAutocomplete(
        assembleSearchQuery(collectionName, e),
        resourceName,
      ).then(runFn(intercept)),
    [intercept],
  );

  return (
    <SearchBar
      expanded
      icon={SearchIcon}
      getResults={handleResults}
    />
  );
};

/**
 * Intercept data post-REST op.
 * Use this to modify search results pre-init q3-ui/lib/searchBar.
 */
Search.propTypes = {
  intercept: PropTypes.func.isRequired,
};

export default Search;
