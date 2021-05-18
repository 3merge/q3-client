import React from 'react';
import { size } from 'lodash';
import { Context as ActionContext } from '../components/ActionBar';

export default (action) => {
  const ctx = React.useContext(ActionContext);
  const registry = Array.isArray(action)
    ? action
    : [action];

  React.useEffect(() => {
    if (!size(registry)) return undefined;

    ctx.add(registry);
    return () => {
      ctx.remove(registry);
    };
  }, []);
};
