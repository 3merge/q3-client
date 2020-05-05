import React from 'react';
import { DesktopDateRangePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import useDecorator from '../helpers/useDecorator';

const toISO = (v) =>
  v !== undefined ? v.toISOString() : v;

export const handleDateChange = (fn, name) => (value) =>
  fn({
    target: {
      name,
      value: toISO(value),
    },
  });

const DateSelect = ({ from, to, ...rest }) => {
  const {
    onChange: onChangeFrom,
    label: startText,
    value: fromValue,
    ...deco
  } = useDecorator({ ...rest, name: from });

  const {
    value: toValue,
    label: endText,
    onChange: onChangeTo,
  } = useDecorator({
    ...rest,
    name: to,
  });

  delete deco.onArrayPull;
  delete deco.onArrayPush;

  return (
    <Grid item xs={12}>
      <DesktopDateRangePicker
        {...deco}
        disablePast
        startText={startText}
        endText={endText}
        variant="outlined"
        fullWidth
        value={[fromValue, toValue]}
        onChange={([newFromValue, newToValue]) => {
          handleDateChange(onChangeTo, to)(newToValue);
          handleDateChange(
            onChangeFrom,
            from,
          )(newFromValue);
        }}
      />
    </Grid>
  );
};

export default DateSelect;
