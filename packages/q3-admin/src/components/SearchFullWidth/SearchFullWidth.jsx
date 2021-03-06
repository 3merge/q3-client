import React from 'react';
import PropTypes from 'prop-types';
import {
  InputAdornment,
  TextField,
  IconButton,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: 2,
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    minWidth: 350,
    width: '100%',

    '&:focus-within': {
      'outline-style': 'auto',
      'outline-width': 'medium',
    },

    '& input': {
      outline: '0 !important',
    },
  },
}));

export const SearchFullWidth = ({
  handleReset,
  value,
  ...rest
}) => {
  const { root } = useStyle();

  return (
    <TextField
      {...rest}
      value={value}
      className={root}
      fullWidth
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <IconButton onClick={handleReset}>
            <Close />
          </IconButton>
        ) : undefined,
      }}
    />
  );
};

SearchFullWidth.propTypes = {
  handleReset: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchFullWidth;
