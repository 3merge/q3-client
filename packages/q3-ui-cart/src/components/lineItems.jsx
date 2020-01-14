import React from 'react';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { CartContext } from '../context';

const Toggle = ({ id, product, quantity }) => {
  const [value, setQuantity] = React.useState(quantity);

  const { update, loading } = React.useContext(CartContext);

  const sendUpdateRequest = (newValue) =>
    update({ id, product, quantity: newValue });

  const decrease = () => sendUpdateRequest(quantity - 1);
  const increase = () => sendUpdateRequest(quantity + 1);

  return (
    <TextField
      disabled={loading}
      variant="outlined"
      label="quantity"
      name="quantity"
      size="small"
      value={value}
      onChange={(e, v) => {
        if (typeof parseInt(v, 10) === 'number')
          setQuantity(v);
      }}
      onBlur={() => {
        console.log('HEHRE');
        sendUpdateRequest(value);
      }}
      helperText="Totals $255"
      InputProps={{
        style: {
          width: 150,
        },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              size="small"
              onClick={decrease}
              disabled={loading}
            >
              <Remove />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={increase}
              disabled={loading}
            >
              <Add />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default () => {
  const { items = [] } = React.useContext(CartContext);
  return items.map(
    ({ product, price, name, img, label, quantity }) => (
      <Paper elevation={2}>
        <Box p={1}>
          <ListItem component="div">
            <ListItemAvatar>
              <img src={img} alt={product} height={65} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <>
                  <Box component="span" display="block">
                    <strong>{label}</strong>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    color="primary"
                  >
                    {price}
                  </Typography>
                </>
              }
            />

            <ListItemSecondaryAction>
              <Grid
                container
                spacing={1}
                alignItems="center"
              >
                <Grid item>
                  <Toggle
                    quantity={quantity}
                    price={price}
                  />
                </Grid>
                <Grid item>
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItemSecondaryAction>
          </ListItem>
        </Box>
      </Paper>
    ),
  );
};
