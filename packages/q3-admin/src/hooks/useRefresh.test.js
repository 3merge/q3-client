import React from 'react';
import useRefresh from './useRefresh';

jest.mock('q3-ui-helpers', () => ({
  browser: {
    isBrowserReady: jest.fn().mockReturnValue(true),
    proxySessionStorageApi: jest
      .fn()
      .mockImplementation((method) => {
        if (method === 'getItem') return '1,2,3';
        return undefined;
      }),
  },
}));

let useContext;
let useContextReturnFn;

let join;
let watch;
let leave;

beforeAll(() => {
  window.location.search = '?sort=name';
});

beforeEach(() => {
  join = jest.fn();
  watch = jest.fn();
  leave = jest.fn();

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => {
      useContextReturnFn = fn();
    });

  useContext = jest.spyOn(React, 'useContext');
});

describe('useRefresh', () => {
  it('should skip when given an id', () => {
    useContext.mockReturnValue({
      join,
      id: 1,
    });

    useRefresh();
    expect(join).not.toHaveBeenCalled();
  });

  it('should join and leave the room', () => {
    const collectionName = 'test';

    const shouldHaveBeenCalledWithCollection = (fn) =>
      expect(fn).toHaveBeenCalledWith({ collectionName });

    useContext.mockReturnValue({
      collectionName,
      join,
      leave,
      watch,
    });

    useRefresh();
    useContextReturnFn();
    shouldHaveBeenCalledWithCollection(join);
    shouldHaveBeenCalledWithCollection(leave);
  });

  it.skip('should poll', (done) => {
    const poll = jest.fn().mockResolvedValue({});
    useContext.mockReturnValue({
      join,
      watch,
    });

    useRefresh(poll, 9);
    watch.mock.calls[0][0]('3');

    setTimeout(() => {
      expect(poll).toHaveBeenCalledWith('?sort=name');
      done();
    }, 10);
  });

  it('should debounce', (done) => {
    const poll = jest.fn().mockResolvedValue({});
    useContext.mockReturnValue({
      join,
      watch,
    });

    useRefresh(poll, 9);
    Array.from({ length: 10 }).forEach(() =>
      watch.mock.calls[0][0](),
    );

    setTimeout(() => {
      expect(poll).toHaveBeenCalledTimes(1);
      done();
    }, 10);
  });
});
