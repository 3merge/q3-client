import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const LoadMore = ({ getMore, hasMore, loading }) => {
  const { t } = useTranslation('labels');

  return (
    <Box align="center" my={2}>
      <Button disabled={!hasMore} onClick={getMore}>
        {t(loading ? 'isLoading' : 'loadMore')}
      </Button>
    </Box>
  );
};

LoadMore.defaultProps = {
  hasMore: false,
  loading: false,
};

LoadMore.propTypes = {
  getMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
};

export default LoadMore;
