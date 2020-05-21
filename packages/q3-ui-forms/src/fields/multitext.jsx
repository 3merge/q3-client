import React from 'react';
import ChipInput from 'material-ui-chip-input';
import Grid from '@material-ui/core/Grid';
import useDecorator from '../helpers/useDecorator';

const Multitext = (props) => {
  const deco = useDecorator(props);
  const { onArrayPush, onArrayPull, value, ...rest } = deco;

  return (
    <Grid item xs={12} style={{ marginBottom: 20 }}>
      <ChipInput
        {...rest}
        value={Array.isArray(value) ? value : []}
        size="small"
        variant="outlined"
        onAdd={onArrayPush}
        onDelete={onArrayPull}
        margin="dense"
        fullWidth
      />
    </Grid>
  );
};

export default Multitext;
