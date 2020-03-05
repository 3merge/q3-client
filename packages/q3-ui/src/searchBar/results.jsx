import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import Highlighter from 'react-highlight-words';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NoResults, Search } from 'q3-ui-assets';
import Avatar from '../avatar';
import ErrorComponent from '../error';

export const hasTerm = (term) =>
  typeof term === 'string' && term.length;

export const hasResults = (results, term) =>
  Array.isArray(results) && results.length && hasTerm(term);

export const getErrorProps = (term) =>
  hasTerm(term)
    ? {
        title: 'noResults',
        description: 'noResults',
      }
    : {
        title: 'startTyping',
        description: 'browseOrClick',
      };

export const asLink = (to) =>
  to
    ? {
        component: Link,
        button: true,
        to,
      }
    : {};

export const withRenderer = (value, element) =>
  value ? element : null;

export const withHighlighter = (term) => {
  const searchWords = String(term).split(' ');

  const HighlighterRenderer = ({ target }) => (
    <Highlighter
      textToHighlight={target}
      autoEscape={false}
      searchWords={searchWords}
    />
  );

  HighlighterRenderer.propTypes = {
    /**
     * The text to read and markup.
     */
    target: PropTypes.string.isRequired,
  };

  return HighlighterRenderer;
};

const SearchResultListeItemPhoto = ({ photo }) =>
  withRenderer(
    photo,
    <ListItemAvatar>
      <Avatar imgSrc={photo} />
    </ListItemAvatar>,
  );

SearchResultListeItemPhoto.propTypes = {
  /**
   * ImgSrc for populating Material UI avatar.
   */
  photo: PropTypes.string,
};

SearchResultListeItemPhoto.defaultProps = {
  photo: null,
};

export const SearchResultListItem = ({
  name,
  description,
  photo,
  url,
  term,
}) => {
  const SearchResultHighlighter = withHighlighter(term);

  return (
    <ListItem {...asLink(url)}>
      <SearchResultListeItemPhoto photo={photo} />
      <ListItemText
        primary={withRenderer(
          name,
          <SearchResultHighlighter target={name} />,
        )}
        secondary={withRenderer(
          description,
          <Box display="block" component="small">
            <SearchResultHighlighter target={description} />
          </Box>,
        )}
      />
    </ListItem>
  );
};

SearchResultListItem.propTypes = {
  /**
   * The list item title/name.
   */
  name: PropTypes.string.isRequired,

  /**
   * A small excerpt for the list item.
   */
  description: PropTypes.string.isRequired,

  /**
   * Will render img source inside list avatar.
   */
  photo: PropTypes.string,

  /**
   * Will make the search results clickable.
   */
  url: PropTypes.string,

  /**
   * Will highlight the matching text
   */
  term: PropTypes.string.isRequired,
};

SearchResultListItem.defaultProps = {
  url: null,
  photo: null,
};

export const SearchResultList = ({ term, getResults }) => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const Icon = hasTerm(term) ? NoResults : Search;

  React.useEffect(() => {
    if (term) {
      setLoading(true);
      getResults(term)
        .then((r) => {
          setResults(r);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [term]);

  if (loading)
    return (
      <Box align="center" p={3}>
        <CircularProgress />
      </Box>
    );

  return !hasResults(results, term) ? (
    <ErrorComponent {...getErrorProps(term)}>
      <Icon
        style={{
          height: 150,
          margin: '3rem auto',
        }}
      />
    </ErrorComponent>
  ) : (
    <List component="nav">
      {results.map((result) => (
        <SearchResultListItem
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
  getResults: PropTypes.func.isRequired,
};

export default SearchResultList;
