import React from 'react';
import {
  IconButton,
  Box,
  TextField,
  Drawer,
} from '@material-ui/core';
import { useLocation } from '@reach/router';
import SearchIcon from '@material-ui/icons/Search';
import { useToggle } from 'useful-state';

export const SearchMobile = (props) => {
  const { close, toggle, state } = useToggle();

  React.useEffect(close, [useLocation()]);

  return (
    <Box px={0.5}>
      <IconButton
        aria-label="toggle search"
        onClick={toggle}
      >
        <SearchIcon />
      </IconButton>
      <Drawer anchor="top" open={state} onClose={toggle}>
        <Box p={2}>
          <TextField
            {...props}
            autoFocus
            fullWidth
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

SearchMobile.propTypes = {};
SearchMobile.defaultProps = {};

export default SearchMobile;
