import React from 'react';
import PropTypes from 'prop-types';
import { withLocation } from 'with-location';
import CircularProgress from '@material-ui/core/CircularProgress';
import Filter from 'q3-ui-filters';
import useFilterAndContext from './useFilterAndContext';
import { appendOptions } from './utils';

/**
 * This is wrapped in the LocationProvider to enable Storybook tracking.
 * Please do not remove.
 */
export const FormWrapper = ({
  id,
  children,
  params,
  ...rest
}) => {
  const { fields, loading } = useFilterAndContext(
    params,
    children,
  );

  return loading ? (
    <CircularProgress />
  ) : (
    <Filter {...rest}>
      {appendOptions(children, fields)}
    </Filter>
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
  }).isRequired,
};

export default withLocation(FormWrapper);
