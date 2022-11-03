import React from 'react';
import PropTypes from 'prop-types';
import {
  InputAdornment,
  TextField,
  IconButton,
  Button,
  Box,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';

export const SearchFullWidth = ({
  handleReset,
  value,
  ...rest
}) => {
  const { t } = useTranslation('labels');
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
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
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
            <Box p={0.25}>
              <Button
                onClick={handleSubmit}
                onKeyPress={handleSubmit}
                variant="contained"
                size="small"
                startIcon="⌘"
              >
                {t('enterSearch')}
              </Button>
            </Box>
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
