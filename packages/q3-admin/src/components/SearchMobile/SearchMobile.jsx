import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  Drawer,
  IconButton,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { useLocation } from '@reach/router';
import SearchIcon from '@material-ui/icons/Search';
import { useToggle } from 'useful-state';
import ButtonWithIcon from '../ButtonWithIcon';

export const SearchMobile = ({
  handleReset,
  value,
  inEffect,
  ...rest
}) => {
  const { close, toggle, state } = useToggle();
  React.useEffect(close, [useLocation()]);

  return (
    <Box textAlign="right">
      <ButtonWithIcon
        on={inEffect}
        label="search"
        icon={SearchIcon}
        onClick={toggle}
      />
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

SearchMobile.defaultProps = {
  inEffect: false,
};

SearchMobile.propTypes = {
  handleReset: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  inEffect: PropTypes.bool,
};

export default SearchMobile;
