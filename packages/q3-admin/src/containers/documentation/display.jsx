import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';

const Display = ({ loading, error, data }) => {
  const { t } = useTranslation('labels');

  if (loading) return <CircularProgress />;
  if (error) return t('documentationError');
  if (!data) return t('documentationEmpty');

  return (
    <div
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{
        __html: data,
      }}
    />
  );
};

Display.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  // eslint-disable-next-line
  data: PropTypes.object,
};

Display.defaultProps = {
  loading: false,
  error: false,
  data: null,
};

export default Display;
