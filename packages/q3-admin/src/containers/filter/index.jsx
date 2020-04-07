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
  includeSearchParams,
  children,
  params,
  ...rest
}) => {
  const { fields, loading } = useFilterAndContext(
    params,
    children,
    includeSearchParams,
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
   * Form fields to mutate.
   */
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,

  /**
   * Injected from with-location HOC.
   */
  params: PropTypes.shape({
    toString: PropTypes.func,
  }).isRequired,

  /**
   * Will include search properties in rest call.
   */
  includeSearchParams: PropTypes.bool,
};

FormWrapper.defaultProps = {
  includeSearchParams: false,
};

export default withLocation(FormWrapper);
