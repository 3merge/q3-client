import React from 'react';
import Template from 'q3-admin/lib/components/Template';
import Grid from '@material-ui/core/Grid';
import Chart from 'q3-admin/lib/containers/Chart';

export default () => (
  <Template muted>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Chart
          component="AreaLine"
          dateRangeProp="createdAt"
          template="newCharacters"
          title="Newly created characters"
        />
      </Grid>
      <Grid item xs={12}>
        <Chart
          component="Bar"
          dateRangeProp="createdAt"
          template="newCharacters"
          title="Newly created characters"
        />
      </Grid>
      <Grid item xs={6}>
        <Chart
          component="Pie"
          dateRangeProp="createdAt"
          template="newCharacters"
          title="Newly created characters"
        />
      </Grid>
    </Grid>
  </Template>
);
