import React from 'react';
import PropTypes from 'prop-types';
import { useValue } from 'useful-state';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useChecked } from 'useful-state';
import Context from '../../utils/searchContext';
import Bulk from '../bulk';

const SearchBar = ({ children }) => {
  const { onChange, value } = useValue('');
  const checked = useChecked();

  const renderSearchBar = () => (
    <Box mb={2}>
      <Bulk>
        <TextField
          fullWidth
          name="search"
          onChange={onChange}
          label="Search"
          type="search"
          value={value}
          variant="filled"
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </Bulk>
    </Box>
  );

  return (
    <Context.Provider value={{ term: value, ...checked }}>
      {children(renderSearchBar)}
    </Context.Provider>
  );
};

SearchBar.propTypes = {
  /*
   * A child to pass renderer fuction to.
   */
  children: PropTypes.func.isRequired,
};

export default SearchBar;
