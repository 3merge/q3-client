import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';

const Display = ({ loading, error, children }) => {
  const { t } = useTranslation('labels');
  if (loading) return <CircularProgress />;
  if (error) return t('commentsError');
  if (!children) return t('commentsEmpty');
  return children;
};

Display.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
  ]),
};

Display.defaultProps = {
  loading: false,
  error: false,
  children: null,
};

export default Display;
