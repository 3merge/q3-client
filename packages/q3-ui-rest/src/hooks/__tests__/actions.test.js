import React from 'react';
import mockAxios from 'jest-mock-axios';
import {
  FETCHED,
  CREATED,
  UPDATED,
  DELETED,
} from '../constants';
import useRest from '../actions';

const dispatch = jest.fn();
let spy;

beforeAll(() => {
  spy = jest
    .spyOn(React, 'useReducer')
    .mockImplementation((_, init) => [init, dispatch]);
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

beforeEach(() => {
  dispatch.mockReset();
});

describe('useRest', () => {
  let get;
  let post;
  let put;
  let patch;
  let remove;

  beforeAll(() => {
    ({ get, post, put, patch, remove } = useRest({
      url: '/foo',
      decorators: {
        post: (v = {}) =>
          Object.assign(v, {
            modified: true,
          }),
      },
    }));
  });

  beforeEach(() => {
    spy.mockClear();
  });

  it('should fetch into state', () => {
    const resp = {
      data: {
        resource: 1,
      },
    };
    get('?search=foo');
    expect(mockAxios.get).toHaveBeenCalledWith(
      '/foo?search=foo',
    );
    mockAxios.mockResponse(resp);
    expect(dispatch.mock.calls).toHaveLength(2);
    expect(dispatch.mock.calls[1]).toEqual([
      expect.objectContaining({
        ...resp,
        type: FETCHED,
      }),
    ]);
  });

  it('should fail to fetch', () => {
    get();
    expect(mockAxios.get).toHaveBeenCalledWith('/foo');
    mockAxios.mockError({
      message: 'Whoops',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: FETCHED,
      err: expect.any(Object),
      data: expect.any(Object),
    });
  });

  it('should fail to fetch', () => {
    get();
    expect(mockAxios.get).toHaveBeenCalledWith('/foo');
    mockAxios.mockError({
      message: 'Whoops',
    });
  });

  it('should delete by ID', () => {
    remove(1)();
    expect(mockAxios.delete).toHaveBeenCalledWith('/foo/1');
    mockAxios.mockResponse();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: DELETED,
      }),
    );
  });

  it('should put by ID', () => {
    put(1)({});
    expect(mockAxios.put).toHaveBeenCalledWith(
      '/foo/1',
      expect.any(Object),
    );
    mockAxios.mockResponse({
      data: {
        bar: 1,
      },
    });
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: UPDATED,
        data: {
          bar: 1,
        },
      }),
    );
  });

  it('should fail to patch', () => {
    put(1)({});
    expect(mockAxios.put).toHaveBeenCalledWith(
      '/foo/1',
      expect.any(Object),
    );
    mockAxios.mockError();
  });

  it('should patch by ID', () => {
    patch(1)({
      foo: 'bar',
    });
    expect(mockAxios.patch).toHaveBeenCalledWith('/foo/1', {
      foo: 'bar',
    });
    mockAxios.mockResponse({
      data: {
        bar: 1,
      },
    });
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: UPDATED,
        data: {
          bar: 1,
        },
      }),
    );
  });

  it('should post with decorator', () => {
    post();
    expect(mockAxios.post).toHaveBeenCalledWith('/foo', {
      modified: true,
    });
    mockAxios.mockResponse();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: CREATED,
      }),
    );
  });

  it('should fail to post', () => {
    post();
    expect(mockAxios.post).toHaveBeenCalledWith('/foo', {
      modified: true,
    });
    mockAxios.mockError();
  });
});

describe('useRest configurations', () => {
  it('should throw an error without arguments', () => {
    expect(() => useRest({})).toThrowError();
  });

  it('should call get automatically', () => {
    const resp = {
      data: {
        resources: [],
      },
    };
    useRest({
      runOnInit: true,
      url: '/',
    });
    expect(mockAxios.get).toHaveBeenCalledWith('/');
    mockAxios.mockResponse(resp);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: FETCHED,
        ...resp,
      }),
    );
  });

  it('should push into the history state', () => {
    const push = jest.fn();
    useRest({
      redirectOnSearch: '/foo',
      location: { search: '?search=bar' },
      history: { push },
      url: '/',
    });
    expect(push).toHaveBeenCalledWith('/foo?search=bar');
  });
});
