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
  spy.mockClear();
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
    const stub = { foo: 'bar' };
    post(stub);
    expect(mockAxios.post).toHaveBeenCalledWith(
      '/foo',
      stub,
      expect.any(Object),
    );
    mockAxios.mockResponse();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: CREATED,
      }),
    );
  });

  it('should fail to post', () => {
    post();
    expect(mockAxios.post).toHaveBeenCalledWith(
      '/foo',
      undefined,
      expect.any(Object),
    );
    mockAxios.mockError();
  });
});

describe('useRest configurations', () => {
  it('should throw an error without arguments', () => {
    expect(() => useRest({})).toThrowError();
  });

  it('should append query string to PATCH', () => {
    const { patch } = useRest({
      url: '/foo/12/items',
      sendUpdateAsAcknowledgement: true,
    });

    patch(1)({
      foo: 1,
    });

    expect(mockAxios.patch).toHaveBeenLastCalledWith(
      '/foo/12/items/1?acknowledge=true',
      expect.any(Object),
    );
  });

  it('should append query string to PATCH', () => {
    const { patch } = useRest({
      url: '/foo/12/items',
      sendUpdateAsFullReceipt: true,
    });

    patch(1)({
      foo: 1,
    });

    expect(mockAxios.patch).toHaveBeenLastCalledWith(
      '/foo/12/items/1?fullReceipt=true',
      expect.any(Object),
    );
  });
});
