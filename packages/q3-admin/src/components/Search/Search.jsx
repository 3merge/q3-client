import React from 'react';
import { Box, Hidden } from '@material-ui/core';
import SearchFullWidth from '../SearchFullWidth';
import SearchMobile from '../SearchMobile';
import useSearchInput from '../../hooks/useSearchInput';

export const Search = () => {
  const textFieldProps = useSearchInput();

  return (
    <Box id="q3-searchbar">
      <Hidden smDown>
        <SearchFullWidth {...textFieldProps} />
      </Hidden>
      <Hidden mdUp>
        <SearchMobile {...textFieldProps} />
      </Hidden>
    </Box>
  );
};

export default Search;
