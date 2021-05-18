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
import useActionBar from '../../hooks/useActionBar';

export const SearchMobile = ({
  handleReset,
  value,
  ...rest
}) => {
  const { close, toggle, state } = useToggle();
  useActionBar({
    label: 'search',
    icon: SearchIcon,
    onClick: toggle,
    sort: 1,
  });

  React.useEffect(close, [useLocation()]);

  return (
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
  );
};

SearchMobile.propTypes = {
  handleReset: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchMobile;
