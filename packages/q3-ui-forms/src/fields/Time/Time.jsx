import React from 'react';
import { get, merge, isNull } from 'lodash';
import { DateTimePicker } from '@material-ui/pickers';
import { getEndAdornment } from '../Text/Text';
import withGrid from '../withGrid';
import withState from '../withState';

const Time = (props) => (
  <DateTimePicker
    clearable
    disableToolbar
    value={get(props, 'value')}
    {...merge({}, props, {
      InputLabelProps: {
        shrink: true,
      },
      InputProps: {
        type: 'text',
        endAdornment: getEndAdornment(props),
      },
    })}
    size="small"
    fullWidth
    inputVariant="outlined"
    format="YYYY/MM/DD hh:mm a"
    placeholder="yyyy/mm/dd hh:mm a"
    onChange={(date) =>
      // eslint-disable-next-line
      props.onChange({
        target: {
          value: !isNull(date) ? date.toDate() : null,
        },
      })
    }
  />
);

export default withState(withGrid(Time));
