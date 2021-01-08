import React from 'react';
import { Grid } from '@material-ui/core';
import SelectForm from './SelectForm';
import Search from './Search';
import useStyles from './useStyle';

const size = { xl: 'auto', lg: 'auto' };
const forms = { md: 6, sm: 6, xs: 12 };

const RepeaterOptions = ({
  filterOptions,
  sortOptions,
  state,
  dispatch,
}) => {
  const handleChange = (label) => (e) =>
    dispatch({ action: label, payload: e.target.value });

  const handleInput = (val) =>
    dispatch({ type: 'input', payload: val });

  const { sortBy, filterBy } = state;
  const cls = useStyles();

  return (
    <Grid container>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Search handleInput={handleInput} />
      </Grid>
      <Grid item {...size} {...forms} className={cls.form}>
        <SelectForm
          options={filterOptions}
          label="filterBy"
          value={filterBy}
          handleChange={handleChange('filterBy')}
        />
      </Grid>
      <Grid item {...size} {...forms} className={cls.form}>
        <SelectForm
          options={sortOptions}
          label="sortBy"
          value={sortBy}
          handleChange={handleChange('sortBy')}
        />
      </Grid>
    </Grid>
  );
};

export default RepeaterOptions;
