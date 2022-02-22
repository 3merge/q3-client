import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SelectForm from '../SelectForm';
import Search from '../Search';

const RepeaterOptions = ({
  filterOptions,
  sortOptions,
  state,
  dispatch,
  disableSearch,
  children,
}) => {
  const handleChange = (label) => (e) =>
    dispatch({ type: label, payload: e.target.value });

  const handleInput = (val) =>
    dispatch({ type: 'input', payload: val });

  const { sortBy, filterBy } = state;

  return (
    <Grid
      alignItems="center"
      container
      spacing={1}
      justifyContent="flex-start"
    >
      {!disableSearch && (
        <Hidden smDown>
          <Grid
            item
            xs
            style={{ width: 320, maxWidth: '100%' }}
          >
            <Search handleInput={handleInput} />
          </Grid>
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
    </Grid>
  );
};

export default RepeaterOptions;
