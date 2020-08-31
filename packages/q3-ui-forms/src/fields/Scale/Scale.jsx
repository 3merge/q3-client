import React from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { array } from 'q3-ui-helpers';
import withState from '../withState';

export default withState(
  ({
    label,
    helperText,
    name,
    value,
    onChange,
    min = 0,
    max = 100,
    ...rest
  }) => (
    <Grid item xs={12}>
      {label && (
        <FormLabel id={name} gutterBottom>
          {label}
        </FormLabel>
      )}
      <Slider
        marks
        value={array.hasLength(value) ? value : [min, max]}
        aria-labelledby={label ? name : undefined}
        valueLabelDisplay="auto"
        onChange={onChange}
        min={min}
        max={max}
        {...rest}
      />
      {helperText && (
        <FormHelperText component="small">
          {helperText}
        </FormHelperText>
      )}
    </Grid>
  ),
);
