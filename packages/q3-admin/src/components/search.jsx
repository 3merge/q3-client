import React from 'react';
import PropTypes from 'prop-types';
import { getForAutocomplete } from 'q3-ui-rest';
import SearchBar from 'q3-ui/lib/searchBar';
import SearchIcon from '../images/search';
import Context from '../containers/state';
import { runFn, assembleSearchQuery } from './utils';

const Search = ({ intercept }) => {
  const {
    collectionName,
    resourceName,
    fetching,
  } = React.useContext(Context);

  const handleResults = React.useCallback(
    (e) =>
      getForAutocomplete(
        assembleSearchQuery(collectionName, e),
        resourceName,
      ).then(runFn(intercept)),
    [intercept],
  );

  return (
    !fetching && (
      <SearchBar
        expanded
        icon={SearchIcon}
        getResults={handleResults}
      />
    )
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
