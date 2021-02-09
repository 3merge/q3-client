import React from 'react';
import { act } from 'react-dom/test-utils';
import useInputDebounce from '../useInputDebounce';

const setup = () => {
  const returnVal = {};

  const TestComponent = () => {
    const shouldRun = useInputDebounce('hi');
    Object.assign(returnVal, { shouldRun });
    return null;
  };
  act(() => {
    global.mount(<TestComponent />);
  });

  return returnVal;
};

test('should return false as an initial value', () => {
  expect(setup()).toHaveProperty('shouldRun', false);
});

test('should debounce', (done) => {
  jest
    .spyOn(React, 'useRef')
    .mockReturnValue({ current: true });

  const test = setup();
  expect(test).toHaveProperty('shouldRun', false);

  setTimeout(() => {
    expect(test).toHaveProperty('shouldRun', true);
    done();
  }, 400);
});
