import React from 'react';
import useDispatcher, {
  reducerDispatcher,
  INIT_VALUE,
} from '../useDispatcher';
import FieldBuilder from '../../helpers/types';

beforeAll(() => {
  jest
    .spyOn(React, 'useReducer')
    .mockImplementation((fn, state) => {
      // will mutate the state for the sake of testing effects
      return [
        state,
        (context) => reducerDispatcher(state, context),
      ];
    });

  jest
    .spyOn(React, 'useLayoutEffect')
    .mockImplementation(() => null);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation(() => null);
});

const setup = () => {
  const initialState = { foo: 1 };
  // we'll use the same starting point for values & errors
  // the methods for mutating each are practically the same
  return useDispatcher(initialState, initialState);
};

const setIn = (methodName, stateProperty) => {
  const d = setup();
  const state = d[methodName]({
    bar: 1,
  });

  expect(state[stateProperty]).not.toHaveProperty('foo');
  expect(state[stateProperty]).toHaveProperty('bar', 1);
};

const setOnField = (methodName, stateProperty) => {
  const d = setup();
  const state = d[methodName]('bar', 1);
  expect(state[stateProperty]).toHaveProperty('foo', 1);
  expect(state[stateProperty]).toHaveProperty('bar', 1);
};

const unsetOnField = (methodName, stateProperty) => {
  const d = setup();
  const state = d[methodName]('bar', 1);
  expect(state[stateProperty]).toHaveProperty('foo', 1);
  expect(state[stateProperty]).not.toHaveProperty('bar');
};

describe('useDispatcher', () => {
  it('should set value and retain and original state values', () =>
    setOnField('setFieldValue', 'values'));

  it('should set error and retain and original state errors', () =>
    setOnField('setFieldError', 'errors'));

  it('should replace all values', () =>
    setIn('setValues', 'values'));

  it.skip('should replace all errors', () =>
    setIn('setErrors', 'errors'));

  it('should remove value and retain and original state values', () =>
    unsetOnField('removeFieldValue', 'values'));

  it('should remove error and retain and original state errors', () =>
    unsetOnField('removeFieldError', 'errors'));

  it('should set an initial balue', () => {
    const d = setup();
    d.initFieldValue('bar', 'select');
    expect(d.values).toHaveProperty('bar', '');
  });

  jest
    .spyOn(FieldBuilder, 'getInitialValue')
    .mockReturnValue({ foo: 'boo' });

  it('should do the thing', () => {
    const state = reducerDispatcher(
      { values: { 'employer.value': null } },
      {
        action: INIT_VALUE,
        value: { 'employer.value': true },
        name: 'employer',
        type: { employer: 'hey' },
      },
    );
    console.log(state);
  });
});
