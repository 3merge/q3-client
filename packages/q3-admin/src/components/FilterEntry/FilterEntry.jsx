import React from 'react';
import { Field } from 'q3-ui-forms/lib/builders';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FilterGroup } from 'q3-components';

const FilterEntry = (rest) => (
  <FilterGroup title={rest.name}>
    <Box px={1} width="100%">
      <Grid container>
        <Field
          collapse={false}
          suppressHelper
          suppressLabel
          xl={12}
          lg={12}
          md={12}
          {...rest}
        />
      </Grid>
    </Box>
  </FilterGroup>
);

export default FilterEntry;
