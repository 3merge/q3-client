import React from 'react';
import useReloadState from './useReloadState';

jest.useFakeTimers();

const getTestCase = (expectedUserResponse) => {
  window.confirm = jest
    .fn()
    .mockReturnValue(expectedUserResponse);

  window.location.reload = jest.fn();

  const Wrapper = () => {
    React.useEffect(useReloadState(), []);
    return <div />;
  };

  global.mount(<Wrapper />);
  jest.runAllTimers();
};

describe('Admin>useReloadState', () => {
  it('should not cancel the reload', () => {
    // they are choosing not to continue without refresh
    getTestCase(false);
    expect(clearTimeout).not.toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should cancel the reload', () => {
    // they are choosing to continue without refresh
    getTestCase(true);
    expect(clearTimeout).toHaveBeenCalled();
    expect(window.location.reload).not.toHaveBeenCalled();
  });
});
