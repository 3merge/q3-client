import React from 'react';
import { get, merge } from 'lodash';
import TextBase from '../TextBase';
import { convertToNullish } from '../../helpers';

const DateBase = (props) => (
  <TextBase
    value={convertToNullish(get(props, 'value'))}
    {...merge({}, props, {
      InputLabelProps: {
        shrink: true,
      },
    })}
    type="date"
  />
);

export default DateBase;
