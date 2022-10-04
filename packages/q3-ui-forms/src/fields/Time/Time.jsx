import React from 'react';
import { merge } from 'lodash';
import TextBase from '../TextBase';
import withGrid from '../withGrid';
import withState from '../withState';
import useDateLocale from '../../hooks/useDateLocale';

const Time = (props) => {
  useDateLocale('YYYY-MM-DDTkk:mm', props);

  return (
    <TextBase
      {...merge({}, props, {
        InputLabelProps: {
          shrink: true,
        },
      })}
      type="datetime-local"
      xl={12}
      lg={12}
      md={12}
    />
  );
};

export default withState(withGrid(Time));
