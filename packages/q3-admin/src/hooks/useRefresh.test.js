import React from 'react';
import useRefresh from './useRefresh';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn().mockReturnValue({
    search: '?sort=name',
  }),
}));

let useContext;
let useContextReturnFn;

let join;
let watch;
let leave;

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

  it('should poll', () => {
    const poll = jest.fn().mockResolvedValue({});
    useContext.mockReturnValue({
      join,
      watch,
    });

    useRefresh(poll);
    watch.mock.calls[0][0]();
    expect(poll).toHaveBeenCalledWith('?sort=name');
  });

  it.only('should debounce', () => {
    const poll = jest.fn().mockResolvedValue({});
    useContext.mockReturnValue({
      join,
      watch,
    });

    useRefresh(poll);
    Array.from({ length: 10 }).forEach((item, i) =>
      watch.mock.calls[0][0](i),
    );

    expect(poll).toHaveBeenCalledTimes(1);
  });
});
