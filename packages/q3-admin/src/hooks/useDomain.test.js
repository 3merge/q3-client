import React from 'react';
import { isFunction } from 'lodash';
import useDomain from './useDomain';

jest.mock('q3-ui-helpers', () => ({
  browser: {
    isBrowserReady: jest.fn().mockReturnValue(true),
  },
}));

jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue({
    data: {
      domain: {
        foo: 1,
      },
    },
  }),
}));

let fn;

beforeEach(() => {
  fn = jest.fn();
  jest.spyOn(React, 'useState').mockReturnValue([{}, fn]);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((callback) => callback());
});

describe('useDomain', () => {
  it('should call state with runtime', () => {
    const value = {
      foo: 1,
    };

    Object.defineProperty(window, 'Q3_RUNTIME_CONFIG', {
      value,
    });

    useDomain();
    expect(fn).toHaveBeenCalledWith(value);
  });

  it('should merge with state', (done) => {
    let out;

    fn.mockImplementation((f) => {
      if (isFunction(f))
        out = f({
          bar: 1,
        });
    });

    useDomain()
      .update()
      .then(() => {
        expect(fn).toHaveBeenCalled();
        expect(out).toEqual({
          bar: 1,
          foo: 1,
        });

        done();
      });
  });
});
