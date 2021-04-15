import React from 'react';
import useRestEffect, {
  changeContentType,
} from './useRestEffect';

beforeAll(() => {
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => {
      fn();
    });
});

describe('useRestEffect', () => {
  it('should invoke run', () => {
    const run = jest.fn();

    useRestEffect({
      runOnInit: true,
      run,
    });

    expect(run).toHaveBeenCalledWith('');
  });

  it('should invoke run with search value', () => {
    const run = jest.fn();

    useRestEffect({
      runOnInit: true,
      run,
      location: {
        search: '?foo=bar',
      },
    });

    expect(run).toHaveBeenCalledWith('?foo=bar');
  });

  it('should not invoke run', () => {
    const run = jest.fn();
    useRestEffect({
      runOnInit: false,
      run,
    });

    expect(run).not.toHaveBeenCalled();
  });

  it('should push into the history state', () => {
    const push = jest.fn();
    useRestEffect({
      redirectOnSearch: '/foo',
      location: { search: '?search=bar' },
      history: { push },
      url: '/',
    });

    expect(push).toHaveBeenCalledWith('/foo?search=bar');
  });
});

describe('changeContentType', () => {
  it('should append headers', () => {
    const config = {
      data: new FormData(),
      headers: {},
    };

    changeContentType(config);
    expect(config.headers).toHaveProperty('Content-Type');
  });

  it('should not append headers', () => {
    const config = {
      data: {},
      headers: {},
    };

    changeContentType(config);
    expect(config.headers).not.toHaveProperty(
      'Content-Type',
    );
  });
});
