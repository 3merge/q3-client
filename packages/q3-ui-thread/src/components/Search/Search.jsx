import React from 'react';
import PropTypes from 'prop-types';
import { useInputDebounce } from 'q3-ui-helpers/lib/hooks';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'q3-ui-locale';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({ handleInput }) => {
  const [state, setState] = React.useState('');
  const shouldRun = useInputDebounce(state);
  const { t } = useTranslation('labels');

  const handleClear = () => setState('');
  const handleChange = (e) => setState(e.target.value);

  React.useEffect(() => {
    handleInput(state);
  }, [shouldRun]);

  return (
    <Box mt={1} mb={0.5}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: state ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClear}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        fullWidth
        label={t('searchNotes')}
        onChange={handleChange}
        size="small"
        value={state}
        variant="outlined"
      />
    </Box>
  );
};

Search.propTypes = {
  handleInput: PropTypes.func.isRequired,
};

export default Search;
