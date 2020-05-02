import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import { array } from 'q3-ui-helpers';
import Graphic from 'q3-ui-assets';
import SearchResultListItem from './searchResultListItem';

const hasTerm = (term) =>
  typeof term === 'string' && term.length > 1;

const getErrorProps = (term) =>
  hasTerm(term)
    ? {
        title: 'noResults',
        description: 'noResults',
        icon: 'NoResults',
      }
    : {
        title: 'startTyping',
        description: 'browseOrClick',
        icon: 'Search',
      };

export const SearchResultList = ({
  term,
  loading,
  results,
  setResults,
  onClick,
}) => {
  if (loading)
    return (
      <Box align="center" p={3}>
        <CircularProgress />
      </Box>
    );

  return !array.hasLength(results) ? (
    <Graphic {...getErrorProps(term)} />
  ) : (
    <List component="ul">
      {results.map((result) => (
        <SearchResultListItem
          button
          onClick={onClick(result.name)}
          key={result.id}
          term={term}
          {...result}
        />
      ))}
    </List>
  );
};

SearchResultList.propTypes = {
  /**
   * The active search term.
   */
  term: PropTypes.string.isRequired,

  /**
   * Promise for fetching search results.
   */
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default SearchResultList;
