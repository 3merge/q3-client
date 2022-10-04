import React from 'react';
import { merge } from 'lodash';
import TextBase from '../TextBase';
import withGrid from '../withGrid';
import withState from '../withState';

const DateBase = (props) => (
  <TextBase
    {...merge({}, props, {
      InputLabelProps: {
        shrink: true,
      },
    })}
    type="date"
    xl={12}
    lg={12}
    md={12}
  />
);

export default withState(withGrid(DateBase));
