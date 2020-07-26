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
  it('should memoize the return value as true/false', () => {
    const el = global.mount(
      React.createElement(() =>
        String(useActiveRequests()),
      ),
    );

    const iterateInterceptor = (type) => {
      const [[fn]] = get(
        axios,
        `interceptors.${type}.use.mock.calls`,
      );

      act(() => {
        fn();
      });
    };

    expect(el.text()).toBe('false');
    iterateInterceptor('request');
    el.update();

    expect(el.text()).toBe('true');
  });
});
