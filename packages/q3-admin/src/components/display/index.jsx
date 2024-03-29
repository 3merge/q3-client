import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import CircularProgress from '@material-ui/core/CircularProgress';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

const Display = ({
  loading,
  error,
  errorLabel,
  children,
}) => {
  const { t } = useTranslation('labels');
  if (loading) return <CircularProgress />;
  if (error)
    return errorLabel ? t(errorLabel) : <BrokenImageIcon />;

  return children;
};

Display.defaultProps = {
  children: null,
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
  ]),

  /**
   * I18n label for error handling.
   */
  errorLabel: PropTypes.string.isRequired,

  /**
   * I18n label for empty state.
   */
  emptyLabel: PropTypes.string,
};

Display.defaultProps = {
  loading: false,
  error: false,
  emptyLabel: undefined,
};

export default Display;
