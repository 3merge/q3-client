import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import useDecorator from '../helpers/useDecorator';

export default (Component) => (props) => {
  const decoratedProps = useDecorator(props);

  return (
    <Grid item md={4} sm={6} xs={12}>
      <Component {...decoratedProps} />
    </Grid>
  );
};

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
