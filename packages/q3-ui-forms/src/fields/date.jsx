import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import useDecorator from '../helpers/useDecorator';
import { simulateEventHandler } from './helpers';

const DateSelect = (props) => {
  const { value, onChange, name, ...deco } = useDecorator(
    props,
  );

  delete deco.onArrayPull;
  delete deco.onArrayPush;

  return (
    <Grid item sm={6} xs={12}>
      <DatePicker
        {...deco}
        name={name}
        type="text"
        variant="outlined"
        fullWidth
        size="small"
        value={value || null}
        onChange={simulateEventHandler(onChange, name)}
        placeholder="yyyy-mm-dd"
        format="YYYY-MM-DD"
        clearable
        autoOk
      />
    </Grid>
  );
};

export default DateSelect;
