import React from 'react';
import { pick } from 'lodash';
import {
  BuilderState,
  DispatcherState,
  ValidationState,
} from '../FormsContext';

/**
 * Abstracted lodash pick fn to allow for strings.
 * It will return nothing without a string or an array.
 * All outputs must be stringified.
 */
export const selectFromObject = (
  dataSource = {},
  target,
) => {
  let params = [];
  if (typeof target === 'string') params = [target];
  if (Array.isArray(target)) params = target;
  return JSON.stringify(pick(dataSource, params));
};

/**
 * The concept here is that some fields need to reset when others change.
 * Typically, those involving validation.
 */
export default (options = {}) => {
  const { listen, name } = options;
  const { values } = React.useContext(BuilderState);
  const { validateAt } = React.useContext(ValidationState);
  const { onChange } = React.useContext(DispatcherState);

  const [prevState, setPrevState] = React.useState('');
  const nextState = selectFromObject(values, listen);

  React.useEffect(() => {
    if (!name || !listen) return;
    if (prevState && prevState !== nextState) {
      onChange(name, '');
      validateAt(name);
    }

    setPrevState(nextState);
  }, [nextState, prevState, listen]);
};
