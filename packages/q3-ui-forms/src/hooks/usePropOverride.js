import React from 'react';
import { object } from 'q3-ui-helpers';
import { BuilderState } from '../FormsContext';

export default (name, override, args = {}) => {
  const { values, errors } = React.useContext(BuilderState);

  React.useLayoutEffect(() => {
    const hasKeys = object.hasKeys(args);

    if (object.isFn(override) && hasKeys)
      Object.assign(
        args,
        override(
          {
            values,
            errors,
          },
          args,
        ),
      );
  }, [override, values, errors]);

  return args;
};
