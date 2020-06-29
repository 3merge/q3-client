import React from 'react';
import { MobileDatePicker } from '@material-ui/pickers';
import { get, merge } from 'lodash';
import Text from '../Text';
import { convertToNullish } from '../../helpers';

const DateBase = (props) => {
  // eslint-disable-next-line
  if (props.placeholder === 'yyyy-mm-dd')
    return (
      <Text
        {...merge({}, props, {
          InputLabelProps: {
            shrink: true,
          },
        })}
      />
    );

  return (
    <MobileDatePicker
      {...props}
      clearable
      disableMaskedInput
      value={convertToNullish(get(props, 'value'))}
      renderInput={(inputProps) => (
        <Text
          {...merge({}, inputProps, props, {
            InputLabelProps: {
              shrink: true,
            },
          })}
          type="date"
        />
      )}
    />
  );
};

export default DateBase;
