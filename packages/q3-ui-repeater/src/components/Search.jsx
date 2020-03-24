import React from 'react';
import Box from '@material-ui/core/Box';
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
      label="Start typing ..."
      type="search"
      value={value}
      disableUnderline
      style={{ marginTop: '-1rem' }}
      inputProps={{
        autoComplete: 'off',
        disableUnderline: true,
      }}
      // eslint-disable-next-line
      InputProps={{
        autoComplete: 'off',
        disableUnderline: true,
      }}
    />
  );
};

export default SearchBar;
