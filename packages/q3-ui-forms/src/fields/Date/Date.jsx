import React from 'react';
import { get, merge, isNull } from 'lodash';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { getEndAdornment } from '../Text/Text';
import { marshalProps } from '../TextBase/TextBase';
import withGrid from '../withGrid';
import withState from '../withState';

const DateBase = (props) => (
  <KeyboardDatePicker
    clearable
    value={get(props, 'value')}
    {...merge({}, marshalProps(props), {
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
    format="YYYY/MM/DD"
    placeholder="yyyy/mm/dd"
    onChange={(date) =>
      // eslint-disable-next-line
      props.onChange({
        target: {
          value: !isNull(date)
            ? date.format('YYYY-MM-DD')
            : null,
        },
      })
    }
  />
);

export default withState(withGrid(DateBase));
