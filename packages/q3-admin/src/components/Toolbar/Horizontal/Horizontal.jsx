import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useHeader } from 'q3-hooked';
import * as Back from '../../Back';

const StatusWithActions = ({ actions }) => {
  const { updatedBy } = useHeader();

  return (
    <Box my={1} role="toolbar">
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid item>
          <Back.Button />
          {/** <Chip label="Key status" /> */}
        </Grid>
        <Grid item>
          <Typography
            color="grey.700"
            component="small"
            style={{ fontSize: '.833rem' }}
          >
            {updatedBy}
          </Typography>

          {Array.isArray(actions)
            ? actions.map((Action, i) => (
                <Box display="inline" key={i} px={0.25}>
                  <Action />
                </Box>
              ))
            : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatusWithActions;
