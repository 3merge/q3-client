import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { array } from 'q3-ui-helpers';
import { CartContext } from '../context';

const DrawerFooter = ({
  close,
  shopPath,
  checkoutPath,
}) => {
  const { t } = useTranslation();
  const { items, hasError } = React.useContext(CartContext);

  const handleNavigate = (to) => () => {
    navigate(to);
    close();
  };

  // rather than disabling
  if (hasError) return null;

  return (
    <Box component="footer" my={1} align="center">
      <Button
        onClick={handleNavigate(checkoutPath)}
        disabled={!array.hasLength(items)}
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
      >
        {t('labels:checkout')}
      </Button>
      <Box my={0.5}>
        <Button
          onClick={handleNavigate(shopPath)}
          size="small"
        >
          {t('labels:shop')}
        </Button>
      </Box>
    </Box>
  );
};

DrawerFooter.propTypes = {
  close: PropTypes.func.isRequired,
  checkoutPath: PropTypes.string,
  shopPath: PropTypes.string,
};

DrawerFooter.defaultProps = {
  checkoutPath: '/checkout',
  shopPath: '/shop',
};

export default DrawerFooter;
