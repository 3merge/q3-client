import React from 'react';
import TextField from '@material-ui/core/TextField';
import RepeaterSearch from './state';

export const SearchContext = React.createContext();

const SearchBar = () => {
  const {
    search: { onChange, value },
  } = React.useContext(RepeaterSearch);

  return (
    <TextField
      fullWidth
      name="search"
      onChange={onChange}
      label="Search"
      type="search"
      value={value}
      inputProps={{
        autoComplete: 'off',
      }}
    />
  );
};

export default SearchBar;
