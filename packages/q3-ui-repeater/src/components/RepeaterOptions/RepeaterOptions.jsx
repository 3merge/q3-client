import React from 'react';
import { Grid } from '@material-ui/core';
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
    <Grid alignItems="center" container spacing={1}>
      <Grid item>{children}</Grid>
      {!disableSearch && (
        <Grid item xs>
          <Search handleInput={handleInput} />
        </Grid>
      )}
      <SelectForm
        options={filterOptions}
        label="filterBy"
        value={filterBy}
        handleChange={handleChange('filterBy')}
      />
      <SelectForm
        options={sortOptions}
        label="sortBy"
        value={sortBy}
        handleChange={handleChange('sortBy')}
      />
    </Grid>
  );
};

export default RepeaterOptions;
