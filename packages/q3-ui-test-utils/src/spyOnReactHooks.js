import React from 'react';

const spyOnReactHooks = () => ({
  useCallback: () => {
    const spy = jest
      .spyOn(React, 'useCallback')
      .mockImplementation((fn) => fn);

    return {
      spy,
    };
  },
  useState: (defaultValue) => {
    const callback = jest.fn();
    const spy = jest
      .spyOn(React, 'useState')
      .mockReturnValue(defaultValue, callback);

    return {
      callback,
      spy,
    };
  },
});

export default spyOnReactHooks;
