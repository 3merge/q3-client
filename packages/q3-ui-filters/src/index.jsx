import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import { withLocation } from 'with-location';
import { url } from 'q3-ui-helpers';
import {
  marshalFormFieldsIntoUrlString,
  appendEmptyValues,
  findByRegex,
} from './components/utils';

export const handleClear = ({
  values = {},
  state = {},
  remove,
  done,
}) => () => {
  Object.keys(values)
    .map((key) => {
      const i = findByRegex(Object.keys(state), key);
      return i !== -1 ? Object.keys(state)[i] : key;
    })
    .forEach((key) => remove(url.decode(key)));

  done();
};

export const FilterForm = ({
  next,
  clearLabel,
  children,
  params,
  pushTo,
  getAll,
  redirect,
  autosave,
  applyLabel,
  ...rest
}) => {
  const currentState = getAll();
  const remove = params.delete.bind(params);
  const initialValues = appendEmptyValues(
    children,
    currentState,
  );

  const apply = (values) =>
    pushTo(
      marshalFormFieldsIntoUrlString(values, {
        remove,
      }),
    );

  const handleSubmit = (values) => {
    if (!autosave) return;
    apply(values);
  };

  return (
    <Formik
      {...rest}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, resetForm }) => (
        <Form>
          {children}
          <Box mt={1}>
            {!autosave && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                style={{
                  marginRight: '0.5rem',
                }}
                onClick={() => {
                  apply(values);
                  if (next) next();
                }}
              >
                {applyLabel}
              </Button>
            )}
            <Button
              size="large"
              variant="contained"
              onClick={handleClear({
                remove,
                values,
                state: currentState,

                done: () => {
                  resetForm();
                  redirect();
                },
              })}
            >
              {clearLabel}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

FilterForm.propTypes = {
  /**
   * Most probably the fields available in ./components
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,

  /**
   * Handle location changes.
   */
  next: PropTypes.func.isRequired,

  /**
   * Text label for the reset button.
   */
  clearLabel: PropTypes.string,

  /**
   * Text label for the apply button.
   */
  applyLabel: PropTypes.string,

  /**
   * Injected from with-location lib.
   */
  getAll: PropTypes.func.isRequired,

  /**
   * Injected from with-location lib.
   */
  pushTo: PropTypes.func.isRequired,

  /**
   * Injected from with-location lib.
   */
  redirect: PropTypes.func.isRequired,

  /**
   * When enabled, it will automatically redirect on state change.
   */
  autosave: PropTypes.bool,
  /**
   * Injected from with-location lib.
   */
  params: PropTypes.shape({
    toString: PropTypes.func,
    delete: PropTypes.func,
    redirect: PropTypes.func,
  }).isRequired,
};

FilterForm.defaultProps = {
  clearLabel: 'Clear',
  applyLabel: 'Apply',
  autosave: false,
};

export default withLocation(FilterForm);
