import React from 'react';
import { MobileDatePicker } from '@material-ui/pickers';
import { merge } from 'lodash';
import Text from '../Text';

const DateBase = (props) => (
  <MobileDatePicker
    {...props}
    clearable
    renderInput={(inputProps) => (
      <Text
        {...merge(inputProps, props, {
          shrink: true,
        })}
        type="date"
      />
    )}
  />
);

export default DateBase;
