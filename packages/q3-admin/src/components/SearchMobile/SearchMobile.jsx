import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Box,
  TextField,
  Drawer,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { useLocation } from '@reach/router';
import SearchIcon from '@material-ui/icons/Search';
import { useToggle } from 'useful-state';

export const SearchMobile = ({
  handleReset,
  value,
  ...rest
}) => {
  const { close, toggle, state } = useToggle();
  React.useEffect(close, [useLocation()]);

  return (
    <Box>
      <IconButton
        aria-label="toggle search"
        onClick={toggle}
      >
        <SearchIcon />
      </IconButton>
      <Drawer anchor="top" open={state} onClose={toggle}>
        <Box p={2}>
          <TextField
            {...rest}
            value={value}
            autoFocus
            fullWidth
            InputProps={{
              disableUnderline: true,
              endAdornment: value ? (
                <IconButton onClick={handleReset}>
                  <Close />
                </IconButton>
              ) : undefined,
            }}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

SearchMobile.propTypes = {
  handleReset: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchMobile;
