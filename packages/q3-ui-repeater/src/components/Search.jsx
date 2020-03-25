import React from 'react';
import Input from '@material-ui/core/Input';
import RepeaterSearch from './state';

export const SearchContext = React.createContext();

const SearchBar = () => {
  const {
    search: { onChange, value },
  } = React.useContext(RepeaterSearch);

  return (
    <Input
      fullWidth
      name="search"
      onChange={onChange}
      placeholder="Search"
      aria-label="Search results"
      type="search"
      value={value}
      disableUnderline
      autoComplete="off"
    />
  );
};

export default SearchBar;
