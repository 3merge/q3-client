import React from 'react';

const spyOnReactHooks = () => ({
  useMemo: () => {
    const spy = jest
      .spyOn(React, 'useMemo')
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
