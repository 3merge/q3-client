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
    <Box mb={1}>
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
    </Box>
  );
};

export default SearchBar;
