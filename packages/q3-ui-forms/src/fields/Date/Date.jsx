import React from 'react';
import { get } from 'lodash';
import moment from 'moment';
import DateBase from '../DateBase';
import withState from '../withState';

export const formatDate = (val) => {
  const out =
    val instanceof moment
      ? val.format('YYYY-MM-DD')
      : moment(val).format('YYYY-MM-DD');

  return out === 'Invalid date' ? null : out;
};

export default withState(
  ({ value, onChange, name, ...rest }) => (
    <DateBase
      {...rest}
      name={name}
      value={value}
      onChange={(e, val) =>
        onChange(e, get(val, 'value', val), formatDate)
      }
    />
  ),
);
