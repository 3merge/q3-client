import React from 'react';
import PropTypes from 'prop-types';
import { withLocation } from 'with-location';
import CircularProgress from '@material-ui/core/CircularProgress';
import useFilterAndContext from './useFilterAndContext';
import {
  appendOptions,
  appendEmptyValues,
  goTo,
} from './utils';
import Form from './form';

export const FormWrapper = ({
  id,
  children,
  pushTo,
  params,
  getFrom,
  getAll,
  ...rest
}) => {
  const { fields, loading } = useFilterAndContext(
    params,
    children,
  );

  const initialValues = appendEmptyValues(
    children,
    getFrom,
  );

  const handleSubmit = (values, actions) => {
    pushTo(values);
    goTo(id, params);
    actions.setSubmitting(false);
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <Form
      {...rest}
      initialStatus={id}
      enableSubmit={false}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {appendOptions(children, fields)}
    </Form>
  );
};

FormWrapper.propTypes = {
  /**
   * Form localStorage id.
   */
  id: PropTypes.string.isRequired,

  /**
   * Form fields to mutate.
   */
  children: PropTypes.arrayOf([
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,

  /**
   * Injected from with-location HOC.
   */
  pushTo: PropTypes.func.isRequired,

  /**
   * Injected from with-location HOC.
   */
  getFrom: PropTypes.func.isRequired,

  /**
   * Injected from with-location HOC.
   */
  getAll: PropTypes.func.isRequired,

  /**
   * Injected from with-location HOC.
   */
  params: PropTypes.shape({
    toString: PropTypes.func,
    delete: PropTypes.func,
  }).isRequired,
};

export default withLocation(FormWrapper);
