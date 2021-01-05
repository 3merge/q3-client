import React from 'react';
import {
  InputAdornment,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFF',
    borderRadius: 2,
    boxSizing: 'border-box',
    marginRight: theme.spacing(1),
    maxWidth: '100%',
    padding: theme.spacing(0.5),
    width: '100%',

    [theme.breakpoints.down('md')]: {
      backgroundColor: 'rgb(231 232 232)',
    },

    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#f5f7f9',
      marginRight: 0,
    },

    '&:focus-within': {
      'outline-style': 'auto',
      'outline-width': 'medium',
    },

    '& input': {
      outline: '0 !important',
    },
  },
}));

export const SearchFullWidth = (props) => {
  const { root } = useStyle();

  return (
    <TextField
      {...props}
      className={root}
      fullWidth
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

SearchFullWidth.propTypes = {};
SearchFullWidth.defaultProps = {};

export default SearchFullWidth;
