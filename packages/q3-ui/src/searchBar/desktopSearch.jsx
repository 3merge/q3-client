import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Hidden from '@material-ui/core/Hidden';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import SearchResultListItem from './searchResultListItem';
import useAutocompleteSearch from './useAutocompleteSearch';
import useAutocompleteSearchResults from './useAutocompleteSearchResults';
import useStyles from './useStyles';

const getEnterEvent = (value) => ({
  key: 'Enter',
  target: {
    value,
  },
});

const getOptionLabel = (option) => option.name;

const handleClose = (next) => (e, action) => {
  const { value } = e.target;
  if (action === 'select-option' && value)
    next(getEnterEvent(value));
};

const handleChange = (next) => (event, newValue) => {
  if (!newValue) return next('');
  if (typeof newValue === 'string') return next(newValue);
  if (newValue.url) navigate(newValue.url);
  return next(newValue.name);
};

const handleInputChange = (done, prevValue) => (
  e,
  v,
  action,
) => {
  if (action === 'clear' && prevValue)
    done(getEnterEvent(null));
};

const DesktopSearch = ({
  getResults,
  handleSearch,
  initialValue,
  redirectPath,
}) => {
  const ref = React.useRef();
  const { t } = useTranslation('labels');
  const cls = useStyles();

  const {
    value,
    setValue,
    onClear,
    ...rest
  } = useAutocompleteSearch(initialValue);

  const [v] = useDebounce(value, 350, {
    maxWait: 750,
  });

  const { loading, results } = useAutocompleteSearchResults(
    getResults,
    v,
    ref,
  );

  const onSearch = handleSearch(() => null, redirectPath);

  return (
    <Hidden smDown>
      <Autocomplete
        innerRef={ref}
        freeSolo
        autoComplete
        ListboxComponent={List}
        PaperComponent={(props) =>
          React.createElement(Paper, {
            ...props,
            elevation: 2,
          })
        }
        options={results}
        inputValue={value}
        loading={loading}
        getOptionLabel={getOptionLabel}
        onChange={handleChange(setValue)}
        onClose={handleClose(onSearch)}
        onInputChange={handleInputChange((args) => {
          onClear();
          onSearch(args);
        }, value)}
        filterOptions={(options) => options}
        renderOption={(option) => (
          <SearchResultListItem
            onClick={() =>
              onSearch(getEnterEvent(option.name))
            }
            {...option}
          />
        )}
        renderInput={(params) => (
          <TextField
            {...rest}
            {...params}
            disableUnderline
            onKeyPress={onSearch}
            inputProps={{
              ...params.inputProps,
              'aria-label': t('searchSite'),
              className: cls.input,
            }}
            // eslint-disable-next-line
            InputProps={{
              ...params.InputProps,
              style: { flexWrap: 'nowrap' },
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Hidden>
  );
};

DesktopSearch.propTypes = {
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

DesktopSearch.defaultProps = {
  initialValue: '',
};

export default DesktopSearch;
