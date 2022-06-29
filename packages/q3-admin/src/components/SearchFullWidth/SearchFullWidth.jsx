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
    borderRadius: 4,
    boxSizing: 'border-box',
    padding: `0 ${theme.spacing(1)}`,
    width: 425,
    maxWidth: '20vw',
    transition: 'box-shadow 250ms',
    backgroundColor: theme.palette.background.muted,
    height: 36.5,
    margin: 0,
    marginRight: theme.spacing(1),

    '&:focus-within': {
      'outline-style': 'auto',
      'outline-width': 'medium',
    },

    '& > *': {
      height: '100%',
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
