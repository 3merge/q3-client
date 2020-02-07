import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { unflatten } from 'flat';
import { Formik } from 'formik';
import { Location } from '@reach/router';
import { withLocation } from 'with-location';
import {
  marshalFormFieldsIntoUrlString,
  appendEmptyValues,
  findByRegex,
  assembleLengthQuery,
} from './components/utils';

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

  const handleClear = (values, done) => () => {
    Object.keys(values)
      .map((key) => {
        const i = findByRegex(
          Object.keys(currentState),
          key,
        );
        return i !== -1
          ? Object.keys(currentState)[i]
          : key;
      })
      .forEach((key) => {
        params.delete(assembleLengthQuery(key));
      });

    done();
    redirect();
  };

  const handleSubmit = (values) => {
    const out = marshalFormFieldsIntoUrlString(values, {
      remove: params.delete.bind(params),
    });

    params.delete('page');
    pushTo(out);
  };

  const initialValues = appendEmptyValues(
    children,
    currentState,
  );

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
          <Button onClick={handleClear(values, resetForm)}>
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
  clearLabel: 'Clear active filters',
};

export default withLocation(FilterForm);
