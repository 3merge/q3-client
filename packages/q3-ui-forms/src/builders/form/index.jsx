import 'react-json-pretty/themes/acai.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Box from '@material-ui/core/Box';
import { FormikDebug } from '../multistep';
import Back from '../back';
import Next from '../next';
import Persist from '../persist';
import withWrapper from '../wrapper';
import Validate from '../validate';

const invokeIfDefined = (a, fn) => (a ? fn() : null);

const prefixForSessionStorage = (a, b) =>
  a ? `${a}-${b}` : b;

export const FormBuilder = ({
  children,
  debug,
  enableSubmit,
  enableReset,
  formikProps,
  onSubmit,
  onReset,
  resetLabel,
  submitLabel,
  id,
  name,
  ...rest
}) => (
  <Formik
    validateOnBlur={false}
    validateOnChange={false}
    validateOnMount={false}
    onSubmit={onSubmit}
    onReset={() => invokeIfDefined(rest.isReady, onReset)}
    {...formikProps}
    {...rest}
  >
    {({ resetForm }) => (
      <Form>
        {id && (
          <Persist id={prefixForSessionStorage(name, id)} />
        )}
        <Validate />
        {children}
        <Box mt={1}>
          {enableSubmit && (
            <Next submit label={submitLabel} />
          )}
          {enableReset && (
            <Back
              left
              onClick={onReset || resetForm}
              label={resetLabel}
            />
          )}
          <FormikDebug show={debug} />
        </Box>
      </Form>
    )}
  </Formik>
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
   * Enable a state viewer for debugging purposes.
   */
  debug: PropTypes.bool,

  /**
   * Custom submit button label.
   */
  submitLabel: PropTypes.string,

  /**
   * Custom reset button label.
   */
  resetLabel: PropTypes.string,

  /**
   * Formik settings passed via Wrapper.
   * See https://jaredpalmer.com/formik/docs/api/formik
   */
  formikProps: PropTypes.shape({}).isRequired,

  /**
   * Include a pre-wired submit button.
   */
  enableSubmit: PropTypes.bool,

  /**
   * Include a pre-wired reset button.
   */
  enableReset: PropTypes.bool,

  /**
   * Configures sessionStorage.
   */
  id: PropTypes.string,

  /**
   * Prefixes the ID for sessionStorage.
   * Useful for multi-form apps on a single resource.
   */
  name: PropTypes.string,
};

FormBuilder.defaultProps = {
  submitLabel: 'submit',
  resetLabel: 'reset',
  debug: false,
  onReset: null,
  enableSubmit: true,
  enableReset: false,
  id: null,
  name: null,
};

export default withWrapper(FormBuilder);
