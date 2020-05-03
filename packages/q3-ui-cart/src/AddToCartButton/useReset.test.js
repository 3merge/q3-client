import React from 'react';
import useReset from './useReset';

const setState = jest.fn();

jest
  .spyOn(React, 'useState')
  .mockImplementation((v) => [v, setState]);

beforeAll(() => {
  jest.useFakeTimers();
});

describe('useReset', () => {
  it('should turn off and on again', () => {
    const [on, setOn] = useReset();
    expect(on).toBeFalsy();
    setOn();

    jest.runAllTimers();

    expect(setState).toHaveBeenCalledWith(true);
    expect(setState).toHaveBeenCalledWith(false);
  });
});
