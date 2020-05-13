import React from 'react';
import { MobileDatePicker } from '@material-ui/pickers';
import { merge } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Text from '../Text';

const DateBase = (props) => (
  <Grid item xs={12}>
    <MobileDatePicker
      {...props}
      renderInput={(inputProps) => (
        <Text {...merge(inputProps, props)} type="date" />
      )}
    />
  </Grid>
);

export default DateBase;
