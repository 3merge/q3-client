import React from 'react';
import { Box, Grid } from '@material-ui/core';
import SelectForm from './SelectForm';
import Search from './Search';
import useStyles from './useStyle';

const size = { xs: 12, sm: 6, md: 6, lg: 6, xl: 6 };

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
        <Box mb={2}>
          <Search handleInput={handleInput} />
        </Box>
      </Grid>
      <Grid item container spacing={1}>
        <Grid item {...size} className={cls.form}>
          <SelectForm
            options={filterOptions}
            label="filterBy"
            value={filterBy}
            handleChange={handleChange('filterBy')}
          />
        </Grid>
        <Grid item {...size} className={cls.form}>
          <SelectForm
            options={sortOptions}
            label="sortBy"
            value={sortBy}
            handleChange={handleChange('sortBy')}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RepeaterOptions;
