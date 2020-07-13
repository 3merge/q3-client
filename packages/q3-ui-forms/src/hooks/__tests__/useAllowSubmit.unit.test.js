import React from 'react';
import useAllowSubmit from '../useAllowSubmit';

let useContext;
let useState;

const expectToBeDisabled = (params, context) => {
  useContext.mockReturnValue(context);
  useAllowSubmit(params);
  expect(useState).toHaveBeenCalledWith(true);
};

beforeEach(() => {
  let stateValue;
  useState = jest.fn().mockImplementation((newValue) => {
    stateValue = newValue;
  });

  useContext = jest.spyOn(React, 'useContext');
  jest.spyOn(React, 'useState').mockImplementation(() => {
    return [stateValue, useState];
  });

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

describe('useAllowSubmit', () => {
  it('should disable on submitting', () =>
    expectToBeDisabled(false, {
      isSubmitting: true,
    }));

  it('should disable on authorization', () =>
    expectToBeDisabled(false, {
      disable: true,
    }));

  it('should disable on errors', () =>
    expectToBeDisabled(false, {
      errors: { foo: 1 },
    }));

  it('should not disable on parameter', () =>
    expectToBeDisabled(true, {}));

  it('should not disable', () => {
    useContext.mockReturnValue({});

    expect(useAllowSubmit()).toBeTruthy();
    expect(useState).toHaveBeenCalledWith(false);
  });
});
