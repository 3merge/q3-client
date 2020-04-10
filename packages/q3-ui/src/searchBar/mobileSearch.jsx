import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Drawer from 'q3-ui-dialog';
import useAutocompleteSearchResults from './useAutocompleteSearchResults';
import useAutocompleteSearch from './useAutocompleteSearch';
import { SearchTrigger, CloseTrigger } from './triggers';
import SearchResults from './results';

const MobileSearch = ({
  getResults,
  handleSearch,
  initialValue,
  redirectPath,
}) => {
  const {
    value,
    setValue,
    onClear,
    ...rest
  } = useAutocompleteSearch(initialValue);
  const { loading, results } = useAutocompleteSearchResults(
    getResults,
    value,
  );

  return (
    <Hidden mdUp>
      <Drawer
        renderHeader={({ close }) => (
          <Box p={2}>
            <Input
              {...rest}
              autoFocus
              value={value}
              onKeyPress={handleSearch(close, redirectPath)}
              startAdornment={
                <Box display="flex" mr={1}>
                  <CloseTrigger onClick={close} />
                </Box>
              }
            />
          </Box>
        )}
        renderTrigger={(o) => (
          <SearchTrigger onClick={o} size="large" />
        )}
        renderContent={(c) => (
          <SearchResults
            results={results}
            loading={loading}
            onClick={(v) => () =>
              handleSearch(
                c,
                redirectPath,
              )({
                key: 'Enter',
                target: {
                  value: v,
                },
              })}
          />
        )}
      />
    </Hidden>
  );
};

MobileSearch.propTypes = {
  /**
   * Fetchings options asyncronously.
   */
  getResults: PropTypes.func.isRequired,

  /**
   * Captures user search selection.
   */
  handleSearch: PropTypes.func.isRequired,

  /**
   * Previous search term.
   */
  initialValue: PropTypes.string,

  /**
   * Search results URL.
   */
  redirectPath: PropTypes.string.isRequired,
};

MobileSearch.defaultProps = {
  initialValue: '',
};

export default MobileSearch;
