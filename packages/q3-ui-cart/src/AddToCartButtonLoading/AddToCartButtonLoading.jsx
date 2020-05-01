/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

const AddToCartButtonLoading = ({ children, loading }) =>
  loading ? (
    <CircularProgress
      color="primary"
      style={{ width: '1.2rem', height: '1.2rem' }}
    />
  ) : (
    <Fade in>
      <Box display="flex">{children}</Box>
    </Fade>
  );

AddToCartButtonLoading.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

AddToCartButtonLoading.defaultProps = {
  loading: false,
};

export default AddToCartButtonLoading;
