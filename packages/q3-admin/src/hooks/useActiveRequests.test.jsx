import React from 'react';
import axios from 'axios';
import { get } from 'lodash';
import { act } from 'react-dom/test-utils';
import useActiveRequests from './useActiveRequests';

jest.mock('axios');

afterEach(() => {
  // cleaning up the mess left behind the previous test
  axios.reset();
});

describe('useActiveRequests', () => {
  it('should memoize the return value as true/false', async () => {
    const numberOfCallsToMake = 3;
    const renderer = jest.fn().mockImplementation((v) => {
      return String(v);
    });

    const el = global.mount(
      React.createElement(() => {
        const num = useActiveRequests();
        return renderer(num);
      }),
    );

    const iterateInterceptor = (type) => {
      const [[fn]] = get(
        axios,
        `interceptors.${type}.use.mock.calls`,
      );

      act(() => {
        for (let i = 0; i < numberOfCallsToMake; i += 1)
          fn();
      });

      el.update();
    };

    iterateInterceptor('request');

    expect(renderer).toHaveBeenCalledTimes(2);
    expect(el.text()).toBe('true');
    iterateInterceptor('response');

    expect(renderer).toHaveBeenCalledTimes(3);
    expect(el.text()).toBe('false');
  });
});
