import React from 'react';
import PropTypes from 'prop-types';
import { size } from 'lodash';
import { Button, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const LoadMore = ({
  data,
  error,
  getMore,
  hasMore,
  loading,
}) => {
  const { t } = useTranslation('labels');

  return !error && size(data) ? (
    <Box align="center" my={2}>
      <Button
        id="q3-audit-load-more"
        disabled={!hasMore || loading}
        onClick={getMore}
      >
        {t(loading ? 'isLoading' : 'loadMore')}
      </Button>
    </Box>
  ) : null;
};

LoadMore.defaultProps = {
  error: false,
  hasMore: false,
  loading: false,
  data: [],
};

LoadMore.propTypes = {
  error: PropTypes.bool,
  getMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default LoadMore;
