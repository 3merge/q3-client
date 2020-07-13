import React from 'react';
import { merge } from 'lodash';
import { object } from 'q3-ui-helpers';
import { BuilderState } from '../FormsContext';

export default (name, override, args = {}) => {
  const { values, errors } = React.useContext(BuilderState);
  const hasKeys = object.hasKeys(args);

  return object.isFn(override) && hasKeys
    ? merge(
        {},
        args,
        override(
          {
            values,
            errors,
          },
          args,
        ),
      )
    : args;
};
