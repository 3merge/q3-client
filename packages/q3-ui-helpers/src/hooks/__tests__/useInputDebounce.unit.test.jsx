import React from 'react';
import { asyncMount } from 'q3-ui-test-utils/lib/enzymeUtils';
import useInputDebounce from '../useInputDebounce';

const ref = jest.spyOn(React, 'useRef');

jest.useFakeTimers();

beforeEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});

const Input = () => <div />;

const expectFalse = (res) =>
  expect(res).toHaveProperty('shouldRun', false);

const TestComponent = (input) => {
  const shouldRun = useInputDebounce(input);
  jest.clearAllTimers();

  return <Input shouldRun={shouldRun} />;
};

const setup = async () => {
  const el = await asyncMount(<TestComponent />);
  return el.find(Input).props();
};

test('should return false as an initial value', async () => {
  const res = await setup('hi');
  expectFalse(res);
});

test('should debounce', async () => {
  ref.mockReturnValue({ current: true });

  const res = await setup('hi');

  expectFalse(res);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(
    expect.any(Function),
    350,
  );
});
