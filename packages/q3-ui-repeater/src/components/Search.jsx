import React from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Hidden from '@material-ui/core/Hidden';
import { SelectAll } from 'q3-ui-exports';
import RepeaterSearch from './state';

export const SearchContext = React.createContext();

const SearchBar = ({ ids, disableMultiselect }) => {
  const {
    search: { onChange, value },
  } = React.useContext(RepeaterSearch);

  return (
    <Box px={0.5} py={1} display="flex" alignItems="center">
      {!disableMultiselect && (
        <Hidden smDown>
          <Box mr={1}>
            <SelectAll ids={ids} />
          </Box>
        </Hidden>
      )}
      <Input
        fullWidth
        name="search"
        onChange={onChange}
        placeholder="Search the results ..."
        aria-label="Search results"
        type="search"
        value={value}
        disableUnderline
        autoComplete="off"
      />
    </Box>
  );
};

export default SearchBar;
