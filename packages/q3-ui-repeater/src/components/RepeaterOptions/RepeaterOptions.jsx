import React from 'react';
import { Box, Hidden, makeStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SelectForm from '../SelectForm';
import Search from '../Search';

const useStyle = makeStyles(() => ({
  root: {
    '& button:disabled': {
      display: 'none',
    },
  },
}));

const RepeaterOptions = ({
  filterOptions,
  sortOptions,
  state,
  dispatch,
  disableSearch,
  children,
}) => {
  const cls = useStyle();
  const handleChange = (label) => (e) =>
    dispatch({ type: label, payload: e.target.value });

  const handleInput = (val) =>
    dispatch({ type: 'input', payload: val });

  const { sortBy, filterBy } = state;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      className={cls.root}
    >
      {!disableSearch && (
        <Hidden smDown>
          <Box maxWidth="100%" width={320} mr={1}>
            <Search handleInput={handleInput} />
          </Box>
        </Hidden>
      )}
      <SelectForm
        handleChange={handleChange('filterBy')}
        icon={<FilterListIcon />}
        label="filterBy"
        options={filterOptions}
        value={filterBy}
      />
      <SelectForm
        handleChange={handleChange('sortBy')}
        icon={<SortByAlphaIcon />}
        label="sortBy"
        options={sortOptions}
        value={sortBy}
      />
      {children}
    </Box>
  );
};

export default RepeaterOptions;
