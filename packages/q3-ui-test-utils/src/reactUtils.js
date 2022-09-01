import React from 'react';

export const useStateMock = () => {
  const setState = jest.fn();
  const spy = jest
    .spyOn(React, 'useState')
    .mockImplementation((defaultStateValue = null) => [
      defaultStateValue,
      setState,
    ]);

  return {
    assert(expectedStateValue) {
      expect(spy).toHaveBeenCalledWith(expectedStateValue);
    },
    changeReturnValue(newReturnValue) {
      spy.mockReturnValue([newReturnValue, setState]);
    },
    reset() {
      setState.mockClear();
      spy.mockClear();
    },
    setState,
    spy,
  };
};
