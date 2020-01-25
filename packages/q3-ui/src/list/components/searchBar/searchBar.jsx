import React from 'react';
import PropTypes from 'prop-types';
import { useValue } from 'useful-state';
import TextField from '@material-ui/core/TextField';
import Context from '../../utils/searchContext';

const SearchBar = ({ children }) => {
  const { onChange, value } = useValue('');

  const renderSearchBar = () => (
    <TextField
      fullWidth
      name="search"
      onChange={onChange}
      label="Search"
      type="search"
      value={value}
      variant="outlined"
      inputProps={{
        autocomplete: 'off',
      }}
    />
  );

  return (
    <Context.Provider value={{ term: value }}>
      {children(renderSearchBar)}
    </Context.Provider>
  );
};

SearchBar.propTypes = {
  /*
   * A child to pass renderer fuction to.
   */
  children: PropTypes.func.isRequired,
};

export default SearchBar;
