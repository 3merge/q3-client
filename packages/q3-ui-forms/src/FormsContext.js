import React from 'react';
import { pick } from 'lodash';
import { object } from 'q3-ui-helpers';

const compareStates = (a, b) =>
  Number(JSON.stringify(a) !== JSON.stringify(b));

const getState = (attributes = []) => (state) =>
  pick(state, attributes);

export const AuthorizationState = React.createContext(
  {
    collectionName: undefined,
    disable: false,
    canEdit: null,
    canSee: null,
    isNew: false,
  },
  (prev, next) => {
    const fn = getState([
      'collectionName',
      'disable',
      'isNew',
    ]);

    if (
      !object.isFn(next.canSee) ||
      !object.isFn(next.canEdit)
    )
      return 1;

    return compareStates(fn(prev), fn(next));
  },
);

export const BuilderState = React.createContext({
  errors: {},
  isSubmitting: false,
  values: {},
});

export const DispatcherState = React.createContext(
  {
    onChange: null,
    onReset: null,
    setValues: null,
    setErrors: null,
  },
  () => 0,
);

export const ValidationState = React.createContext(
  {
    setField: null,
    validateAt: null,
    validationSchema: {},
    chain: {},
  },
  (prev, next) => {
    const fn = getState(['chain']);
    return compareStates(fn(prev), fn(next));
  },
);
