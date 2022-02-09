import React from 'react';
import { isObject } from 'lodash';
import { Domain } from '../containers/state';

export default () => {
  const ctx = React.useContext(Domain);
  return isObject(ctx)
    ? {
        ...ctx,
        // ensure this is not null
        domain: ctx.domain || {},
      }
    : {};
};
