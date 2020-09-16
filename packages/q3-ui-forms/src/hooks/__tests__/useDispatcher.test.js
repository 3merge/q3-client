import React from 'react';
import useDispatcher, {
  reducerDispatcher,
  INIT_VALUE,
} from '../useDispatcher';

jest.mock('../../helpers/types', () => ({
  getInitialValue: jest.fn().mockReturnValue(1),
}));

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

const runReducerForInitValue = (values = {}) => {
  const state = reducerDispatcher(
    { values },
    {
      action: INIT_VALUE,
      name: 'employer',
    },
  );

  return state.values;
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

  it('should retain initial value', () => {
    expect(
      runReducerForInitValue({ 'employer': 5 }),
    ).toHaveProperty('employer', 5);
  });

  it('should retain initial value', () => {
    expect(runReducerForInitValue()).toHaveProperty(
      'employer',
      1,
    );
  });

  it('should retain initial nested values', () => {
    const values = runReducerForInitValue({
      'employer.value': 5,
    });

    expect(values['employer.value']).toBe(5);
    expect(values).not.toHaveProperty('employer');
  });

  it('should retain initial nested values', () => {
    const values = runReducerForInitValue({
      'employer': {
        value: 5,
      },
    });

    expect(values).toHaveProperty('employer.value', 5);
  });
});
