import React from 'react';
import { useField } from 'formik';
import { KeyboardDatePicker } from '@material-ui/pickers';
import useDecorator from '../helpers/useDecorator';

export const intercept = (fn, name) => (e, newValue) =>
  fn({
    target: {
      value: newValue,
      name,
    },
  });

const DateSelect = (props) => {
  const [{ name, onChange, value }] = useField(props);
  const deco = useDecorator(props);

  return (
    <KeyboardDatePicker
      {...deco}
      name={name}
      fullWidth
      inputVariant="filled"
      InputProps={{
        disableUnderline: true,
      }}
      value={value || null}
      onChange={intercept(onChange, name)}
      placeholder="yyyy/mm/dd"
      format="YYYY/MM/DD"
      clearable
      autoOk
    />
  );
};

export default DateSelect;
