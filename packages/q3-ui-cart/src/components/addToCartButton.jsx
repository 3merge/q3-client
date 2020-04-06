/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { height } from './useStyle';
import withQuantity from './withQuantity';

export const AddToCartLoadingIndicator = ({
  children,
  loading,
}) =>
  loading ? (
    <CircularProgress
      color="#FFF"
      style={{ width: '1.2rem', height: '1.2rem' }}
    />
  ) : (
    <Fade in>
      <Box display="flex">{children}</Box>
    </Fade>
  );

AddToCartLoadingIndicator.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

AddToCartLoadingIndicator.defaultProps = {
  loading: false,
};

export default withQuantity(
  ({ loading, disabled, onClick }) => {
    const { t } = useTranslation('labels');

    return (
      <Button
        fullWidth
        variant="contained"
        size="large"
        color="primary"
        disabled={disabled}
        onClick={onClick}
        style={{ height, marginTop: 4 }}
      >
        <AddToCartLoadingIndicator loading={loading}>
          <ShoppingCart style={{ marginRight: '.5rem' }} />
          {t('addToCart')}
        </AddToCartLoadingIndicator>
      </Button>
    );
  },
);
