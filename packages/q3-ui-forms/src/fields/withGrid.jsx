import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

export default (Component, sizes) => ({
  xl = 4,
  lg = 6,
  ...rest
}) => (
  <Grid item {...{ xl, lg, ...sizes }} sm={12} xs={12}>
    <Component {...rest} />
  </Grid>
);

export const fieldProps = {
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};
