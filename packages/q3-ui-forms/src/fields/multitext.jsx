import React from 'react';
import ChipInput from 'material-ui-chip-input';
import Grid from '@material-ui/core/Grid';
import withState from './withState';

const Multitext = (props) => {
  const {
    onArrayPush,
    onArrayPull,
    value,
    ...rest
  } = props;

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

export default withState(Multitext);
