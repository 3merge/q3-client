import React from 'react';
import { get, set, unset, pick, merge } from 'lodash';
import { object } from 'q3-ui-helpers';
import flat from 'flat';
import FieldBuilder from '../helpers/types';

export const CLEAN = 'clean-state';
export const INIT_VALUE = 'init-value';
export const REPLACE_ERRORS = 'value-errors';
export const REPLACE_VALUES = 'replace-values';
export const SET_ERROR = 'set-error';
export const SET_VALUE = 'set-value';
export const UNSET_ERROR = 'unset-error';
export const UNSET_VALUE = 'unset-value';
export const INIT_PREVIOUS_VALUE = 'init-previous';

export const reducerDispatcher = (state, context) => {
  let { previousValues, errors = {}, values = {} } = state;

  const {
    action,
    name,
    value,
    type,
    done,
    errors: nextErrors,
    values: nextValues,
    options = {},
  } = context;

  switch (action) {
    case SET_ERROR:
      // errors are expected to ALWAYS have a flatten structured
      errors = object.clean(flat(set(errors, name, value)));
      break;

    case SET_VALUE:
      // we'll start modification tracking after the first interaction with state

      if (previousValues === undefined)
        previousValues = { ...values };
      // values do not always have a flatten structure, do to dynamic field types
      // like Autocomplete, Chips and Select

      if (get(options, 'flat')) {
        Object.assign(values, { [name]: value });
      } else {
        set(values, name, value);
      }

      break;

    case REPLACE_ERRORS:
      errors = pick(
        merge(flat.unflatten(nextErrors), nextErrors),
        Object.keys(values),
      );
      break;

    case REPLACE_VALUES:
      values = nextValues;
      errors = nextErrors;
      break;

    case UNSET_VALUE:
      // otherwise dropped fields detect as changes
      unset(previousValues, name);
      unset(values, name);
      break;

    case UNSET_ERROR:
      unset(errors, name);
      errors = object.clean(flat(errors));

      break;

    case INIT_VALUE:
      if (get(flat.unflatten(values), name) === undefined)
        set(
          values,
          name,
          FieldBuilder.getInitialValue(type),
        );

      break;

    case INIT_PREVIOUS_VALUE:
      previousValues = undefined;
      break;

    case CLEAN:
      previousValues = undefined;
      break;

    default:
      break;
  }

  if (done) done(values, errors);

  return {
    values,
    errors,
    previousValues,
    isModified: previousValues
      ? JSON.stringify(previousValues) !==
        JSON.stringify(values)
      : false,
  };
};

export default (initialValues = {}, initialErrors = {}) => {
  const [state, reduce] = React.useReducer(
    reducerDispatcher,
    {
      values: initialValues,
      errors: initialErrors,
    },
  );

  const setIn = (action, targetProp, options = {}) => (
    nextState = {},
  ) => {
    let data = nextState;

    if (typeof nextState === 'function')
      data = nextState(state[targetProp]);

    return reduce({
      action,
      [targetProp]: data,
      options,
    });
  };

  const setField = (action) => (
    name,
    value,
    done,
    options = {},
  ) => {
    if (
      typeof done !== 'function' &&
      object.hasKeys(done)
    ) {
      // eslint-disable-next-line
      options = done;
      // eslint-disable-next-line
      done = null;
    }

    return reduce({
      action,
      name,
      value,
      done,
      options,
    });
  };

  const removeField = (action) => (name) =>
    reduce({ action, name });

  React.useLayoutEffect(
    () =>
      reduce({
        action: REPLACE_VALUES,
        values: initialValues,
        errors: {},
      }),
    [JSON.stringify(initialValues)],
  );

  React.useEffect(() => {
    return () => {
      reduce({
        action: REPLACE_VALUES,
        values: {},
        errors: {},
      });
    };
  }, []);

  return {
    setValues: setIn(REPLACE_VALUES, 'values'),
    setErrors: setIn(REPLACE_ERRORS, 'errors'),
    setFieldValue: setField(SET_VALUE),
    setFieldError: setField(SET_ERROR),

    removeFieldValue: removeField(UNSET_VALUE),
    removeFieldError: removeField(UNSET_ERROR),
    clearPreviousState: () =>
      reduce({
        action: INIT_PREVIOUS_VALUE,
      }),
    initFieldValue: (name, type) =>
      reduce({
        action: INIT_VALUE,
        name,
        type,
      }),
    ...state,
  };
};
