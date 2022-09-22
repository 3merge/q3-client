import React from 'react';

const createEffectMock = (methodName) => () => {
  const spy = jest
    .spyOn(React, methodName)
    .mockImplementation((fn) => fn());

  return {
    reset() {
      spy.mockClear();
    },
    spy,
  };
};

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

export const useContextMock = () => {
  const spy = jest
    .spyOn(React, 'useContext')
    .mockReturnValue(null);

  return {
    changeReturnValue(newReturnValue) {
      spy.mockReturnValue(newReturnValue);
    },
    reset() {
      spy.mockClear();
    },
    spy,
  };
};

export const useCallbackMock = () => {
  const spy = jest
    .spyOn(React, 'useCallback')
    .mockImplementation((fn) => fn);

  return {
    reset() {
      spy.mockClear();
    },
    spy,
  };
};

export const useMemoMock = () => {
  const spy = jest
    .spyOn(React, 'useMemo')
    .mockImplementation((fn) => fn());

  return {
    reset() {
      spy.mockClear();
    },
    spy,
  };
};

export const useEffectMock = createEffectMock('useEffect');
export const useLayoutEffectMock = createEffectMock(
  'useLayoutEffect',
);
