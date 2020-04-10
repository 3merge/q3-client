import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NoResults, Search } from 'q3-ui-assets';
import { array } from 'q3-ui-helpers';
import ErrorComponent from '../error';
import SearchResultListItem from './searchResultListItem';

const hasTerm = (term) =>
  typeof term === 'string' && term.length;

const getErrorProps = (term) =>
  hasTerm(term)
    ? {
        title: 'noResults',
        description: 'noResults',
      }
    : {
        title: 'startTyping',
        description: 'browseOrClick',
      };

export const SearchResultList = ({
  term,
  loading,
  results,
  setResults,
  onClick,
}) => {
  const Icon = hasTerm(term) ? NoResults : Search;

  if (loading)
    return (
      <Box align="center" p={3}>
        <CircularProgress />
      </Box>
    );

  return !array.hasLength(results) ? (
    <ErrorComponent {...getErrorProps(term)}>
      <Icon
        style={{
          height: 150,
          margin: '3rem auto',
        }}
      />
    </ErrorComponent>
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
