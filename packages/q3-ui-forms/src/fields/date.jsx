import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import useDecorator from '../helpers/useDecorator';

export const intercept = (fn, name) => (e, newValue) => {
  return fn({
    target: {
      value: newValue || '',
      name,
    },
  });
};

const DateSelect = (props) => {
  const { value, onChange, name, ...deco } = useDecorator(
    props,
  );

  delete deco.onArrayPull;
  delete deco.onArrayPush;

  return (
    <KeyboardDatePicker
      {...deco}
      name={name}
      type="text"
      fullWidth
      inputVariant="filled"
      value={value || null}
      onChange={intercept(onChange, name)}
      placeholder="yyyy-mm-dd"
      size="small"
      format="YYYY-MM-DD"
      clearable
      autoOk
    />
  );
};

export default DateSelect;
