import React from 'react';
import { invoke, hasIn } from 'lodash';
import { object } from 'q3-ui-helpers';
import RepeaterState from './components/state';

const { hasKeys } = object;

export const RepeaterDecorator = (
  repeater,
  options = {},
) => ({
  get prefix() {
    return hasIn(repeater, 'name')
      ? `${repeater.name}.${options.name}`
      : options.name;
  },

  get isEditable() {
    return (
      typeof repeater.edit === 'function' &&
      invoke(repeater, 'auth.canEditSub', this.prefix) &&
      hasKeys(options.editable)
    );
  },
});

export default (name, editable) => {
  const repeater = React.useContext(RepeaterState);
  const decorators = RepeaterDecorator(repeater, {
    editable,
    name,
  });

  return invoke(
    repeater,
    'auth.canSeeSub',
    decorators.prefix,
  )
    ? {
        ...repeater,
        ...decorators,
      }
    : null;
};
