import React from 'react';
import { DesktopDateRangePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import useDecorator from '../helpers/useDecorator';

const toISO = (v) =>
  v !== undefined ? v.toISOString() : v;

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
        value={[fromValue, toValue]}
        onChange={([newFromValue, newToValue]) => {
          onChangeFrom({
            target: {
              name: from,
              value: toISO(newFromValue),
            },
          });

          onChangeTo({
            target: {
              name: to,
              value: toISO(newToValue),
            },
          });
        }}
      />
    </Grid>
  );
};

export default DateSelect;
