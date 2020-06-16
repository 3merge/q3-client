import React from 'react';
import { get } from 'lodash';
import { string } from 'q3-ui-helpers';
import DateBase from '../DateBase';
import withState from '../withState';

export default withState(
  ({ value, onChange, name, ...rest }) => (
    <DateBase
      {...rest}
      name={name}
      value={value}
      onChange={(e, val) =>
        onChange(
          e,
          get(val, 'value', val),
          string.toYearMonthDay,
        )
      }
    />
  ),
);
