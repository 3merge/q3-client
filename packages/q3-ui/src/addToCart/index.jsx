/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

const height = 64;

const baseButtonStyle = {
  display: 'block',
  position: 'absolute',
  padding: 2,
  right: 8,
};

const useStyle = makeStyles(() => ({
  input: {
    height: 28,
    fontSize: 22,
    '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
      appearance: 'none',
      margin: 0,
    },
  },
  float: {
    backgroundColor: grey[200],
    borderLeft: `2px solid ${grey[300]}`,
    position: 'absolute',
    right: 0,
    width: 45,
    height,
  },
  top: {
    ...baseButtonStyle,
    top: 4,
  },
  bottom: {
    ...baseButtonStyle,
    bottom: 4,
  },
}));

const AddToCart = ({ product, service }) => {
  const { t } = useTranslation();
  const { input, top, bottom, float } = useStyle();
  const [loading, setLoading] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [message, setMessage] = React.useState('');
  const [hasError, setError] = React.useState();

  const captureQuantity = ({ target: { value } }) => {
    setQuantity(value);
    setError(value < 0);
  };

  const resetQuantity = ({ target: { value } }) => {
    if (!value) setQuantity(1);
  };

  const increase = () => setQuantity(quantity + 1);
  const decrease = () =>
    setQuantity(quantity > 0 ? quantity - 1 : 0);

  const sendToService = () => {
    setLoading(true);
    service({ product, quantity }).then(() => {
      setLoading(false);
    });
  };

  React.useEffect(() => {
    setMessage(
      hasError
        ? t('helpers:moreThan1')
        : t('helpers:quantity'),
    );
  }, [hasError]);

  return (
    <Grid container spacing={1} component="form">
      <Grid item sm={4} xs={12}>
        <TextField
          fullWidth
          label={t('labels:quantity')}
          color="secondary"
          type="number"
          variant="outlined"
          onChange={captureQuantity}
          onBlur={resetQuantity}
          error={hasError}
          helperText={message}
          value={quantity}
          inputProps={{
            className: input,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <div className={float}>
                  <IconButton
                    className={top}
                    aria-label={t('labels:add')}
                    onClick={increase}
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    className={bottom}
                    aria-label={t('labels:subtract')}
                    onClick={decrease}
                  >
                    <Remove />
                  </IconButton>
                </div>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item sm={8} xs={12}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          color="primary"
          style={{ height }}
          disabled={quantity <= 0}
          onClick={sendToService}
        >
          {loading ? (
            <CircularProgress color="#FFF" />
          ) : (
            <Fade in={!loading}>
              <div style={{ display: 'flex' }}>
                <ShoppingCart
                  style={{ marginRight: '.5rem' }}
                />
                {t('labels:addToCart')}
              </div>
            </Fade>
          )}
        </Button>
      </Grid>
    </Grid>
  );
};

AddToCart.propTypes = {
  product: PropTypes.string.isRequired,
  service: PropTypes.func.isRequired,
};

export default AddToCart;
