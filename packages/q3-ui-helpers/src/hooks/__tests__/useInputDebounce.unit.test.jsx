import React from 'react';
import { asyncMount } from 'q3-ui-test-utils/lib/enzymeUtils';
import useInputDebounce from '../useInputDebounce';

jest.useFakeTimers();

beforeEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});

const Input = () => <div />;

const TestComponent = () => {
  const shouldRun = useInputDebounce('hi');
  jest.clearAllTimers();

  return <Input shouldRun={shouldRun} />;
};

const setup = async () => {
  const el = await asyncMount(<TestComponent />);
  return el.find(Input).props();
};

test('should return false as an initial value', async () => {
  const res = await setup();
  expect(res).toHaveProperty('shouldRun', false);
});

test('should debounce', async () => {
  jest
    .spyOn(React, 'useRef')
    .mockReturnValue({ current: true });

  const res = await setup();

  expect(res).toHaveProperty('shouldRun', false);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(
    expect.any(Function),
    350,
  );
});
