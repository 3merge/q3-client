import React from 'react';
import Template from 'q3-admin/lib/components/Template';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Chart from 'q3-admin/lib/containers/Chart';
import Typography from '@material-ui/core/Typography';

export default () => (
  <Template muted>
    <Box my={3}>
      <Typography variant="h1">Welcome back</Typography>
    </Box>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Chart
          component="Bar"
          dateRangeProp="createdAt"
          template="newCharacters"
          title="Newly created characters"
        />
      </Grid>
      <Grid item xs={6}>
        <Chart
          component="AreaLine"
          dateRangeProp="updatedAt"
          template="heroCount"
          title="Types of heroes"
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
