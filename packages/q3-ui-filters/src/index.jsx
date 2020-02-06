import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import { withLocation } from 'with-location';
import {
  marshalFormFieldsIntoUrlString,
  appendEmptyValues,
} from './components/utils';

export const FilterForm = ({
  next,
  clearLabel,
  children,
  params,
  pushTo,
  getAll,
  ...rest
}) => {
  const handleNext = () => next(`?${params.toString()}`);

  const handleClear = (values, done) => () => {
    Object.keys(values).forEach((key) =>
      params.delete(key),
    );

    done();
    handleNext();
  };

  const handleSubmit = (values) => {
    const out = marshalFormFieldsIntoUrlString(values, {
      remove: params.delete.bind(params),
    });

    pushTo(out);
    handleNext();
  };

  const initialValues = appendEmptyValues(
    children,
    getAll(),
  );

  return (
    <Formik
      {...rest}
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
