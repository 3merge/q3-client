import React from 'react';
import PropTypes from 'prop-types';
import {
  InputAdornment,
  TextField,
  IconButton,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import useStyle from './styles';

export const SearchFullWidth = ({
  handleReset,
  value,
  ...rest
}) => {
  const cls = useStyle();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    rest.handleSearch(rest?.inputRef?.current?.value);
  };

  return (
    <TextField
      {...rest}
      value={value}
      className={cls.root}
      fullWidth
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment
            className={cls.adornment}
            position="end"
          >
            {value ? (
              <IconButton
                className={cls.clear}
                onClick={handleReset}
              >
                <Close />
              </IconButton>
            ) : null}
            <IconButton
              onClick={handleSubmit}
              onKeyPress={handleSubmit}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

SearchFullWidth.propTypes = {
  handleReset: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchFullWidth;
