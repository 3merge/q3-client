import React from 'react';
import useRest from 'q3-ui-rest';
import useAudit from './useAudit';

const genMockFn = () => {
  const fn = jest.fn();
  useRest.mockReturnValue({
    get: fn,
  });

  return fn;
};

jest.mock('q3-ui-rest');

beforeAll(() => {
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

describe('useAudit', () => {
  it('should call get', () => {
    const mock = genMockFn();
    useAudit('testing', 1, {
      template: 'foo',
    });

    expect(mock).toHaveBeenCalled();
  });

  it('should not call get', () => {
    const mock = genMockFn();
    useAudit('testing', 1, {
      noop: true,
    });

    expect(mock).not.toHaveBeenCalled();
  });
});
