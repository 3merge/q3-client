import React from 'react';
import PropTypes from 'prop-types';
import {
  InputAdornment,
  TextField,
  IconButton,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { isFunction } from 'lodash';
import useStyle from './styles';

const SearchDesktop = ({ handleReset, value, ...rest }) => {
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
        endAdornment:
          value && isFunction(handleReset) ? (
            <IconButton onClick={handleReset}>
              <Close />
            </IconButton>
          ) : undefined,
      }}
    />
  );
};

SearchDesktop.defaultProps = {
  handleReset: null,
};

SearchDesktop.propTypes = {
  handleReset: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default SearchDesktop;
