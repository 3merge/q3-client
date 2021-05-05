import React from 'react';
import useInputDebounce from '../useInputDebounce';

test('should debounce', async () => {
  const setState = jest.fn();

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  jest
    .spyOn(React, 'useState')
    .mockReturnValue([false, setState]);

  useInputDebounce('hi');
  setTimeout(() => {
    expect(setState).toHaveBeenCalledTimes(1);
  }, 750);
});
