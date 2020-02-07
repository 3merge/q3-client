import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import { withLocation } from 'with-location';
import {
  marshalFormFieldsIntoUrlString,
  appendEmptyValues,
  findByRegex,
  assembleLengthQuery,
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
    .forEach((key) => remove(assembleLengthQuery(key)));

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
  ...rest
}) => {
  const currentState = getAll();
  const remove = params.delete.bind(params);
  const initialValues = appendEmptyValues(
    children,
    currentState,
  );

  const handleSubmit = (values) => {
    const out = marshalFormFieldsIntoUrlString(values, {
      remove,
    });

    params.delete('page');
    pushTo(out);
  };

  return (
    <Formik
      {...rest}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, resetForm }) => (
        <>
          {children}
          <Button
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
        </>
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
};

export default withLocation(FilterForm);
