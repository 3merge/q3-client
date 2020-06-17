import 'react-json-pretty/themes/acai.css';
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Back from '../Back';
import Next from '../Next';
import withWrapper from '../Wrapper';

export const FormBuilder = ({
  children,
  enableSubmit,
  enableReset,
  onReset,
  onSubmit,
  resetLabel,
  submitLabel,
}) => (
  <Box component="form" onSubmit={onSubmit} noValidate>
    <Grid container spacing={1}>
      {children}
      <Grid item xs={12}>
        {enableSubmit && (
          <Next submit label={submitLabel} />
        )}
        {enableReset && (
          <Back left label={resetLabel} onClick={onReset} />
        )}
      </Grid>
    </Grid>
  </Box>
);

FormBuilder.propTypes = {
  /**
   * The form fields and containers.
   */
  children: PropTypes.node.isRequired,

  /**
   * Handler for submit action.
   */
  onSubmit: PropTypes.func.isRequired,

  /**
   * Handler for reset action.
   */
  onReset: PropTypes.func,

  /**
   * Custom submit button label.
   */
  submitLabel: PropTypes.string,

  /**
   * Custom reset button label.
   */
  resetLabel: PropTypes.string,

  /**
   * Include a pre-wired submit button.
   */
  enableSubmit: PropTypes.bool,

  /**
   * Include a pre-wired reset button.
   */
  enableReset: PropTypes.bool,
};

FormBuilder.defaultProps = {
  submitLabel: 'submit',
  resetLabel: 'reset',
  onReset: null,
  enableSubmit: true,
  enableReset: false,
};

export default withWrapper(FormBuilder);
