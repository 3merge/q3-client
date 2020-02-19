import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';

const Display = ({
  loading,
  error,
  errorLabel,
  emptyLabel,
  children,
}) => {
  const { t } = useTranslation('labels');
  if (loading) return <CircularProgress />;
  if (error) return t(errorLabel);
  if (!children) return t(emptyLabel);
  return children;
};

Display.propTypes = {
  /**
   * Is the date loading?
   */
  loading: PropTypes.bool,

  /**
   * Has an error occurred?
   */
  error: PropTypes.bool,

  /**
   * Children render when both loading anderror are falsy.
   */
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,

  /**
   * I18n label for error handling.
   */
  errorLabel: PropTypes.string.isRequired,

  /**
   * I18n label for empty state.
   */
  emptyLabel: PropTypes.string.isRequired,
};

Display.defaultProps = {
  loading: false,
  error: false,
};

export default Display;
