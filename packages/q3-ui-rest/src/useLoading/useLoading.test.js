import React from 'react';
import useLoading, {
  handleRequest,
  handleResponse,
  handleError,
} from '.';

jest.useFakeTimers();

jest
  .spyOn(React, 'useState')
  .mockImplementation((v) => [v, jest.fn()]);

jest
  .spyOn(React, 'useEffect')
  .mockImplementation((v) => v());

jest
  .spyOn(React, 'useCallback')
  .mockImplementation((v) => v);

const getItem = jest.spyOn(
  Object.getPrototypeOf(localStorage),
  'getItem',
);

const setItem = jest.spyOn(
  Object.getPrototypeOf(localStorage),
  'setItem',
);

beforeAll(() => {
  window.location.reload = jest.fn();
});

describe('useLoading axios hook', () => {
  describe('requestHandler', () => {
    const req = {
      headers: { common: {} },
      baseURL: 'localhost',
      url: '/foo',
    };

    it('should query localStorage API', () => {
      handleRequest(req);
      expect(getItem).toHaveBeenCalledWith('localhost/foo');
    });

    it('should attach etag headers', () => {
      getItem.mockReturnValue(
        JSON.stringify({
          'Last-Modified': 2,
          ETag: 1,
          data: {},
        }),
      );

      handleRequest(req);
      expect(req.headers.common).toMatchObject({
        'If-Match': 1,
        'If-Unmodified-Since': 2,
      });
    });
  });

  describe('handleResponse', () => {
    const res = {
      data: { foo: 'bar' },
      headers: { ETag: 1, 'Last-Modified': 2 },
      config: { url: '/path' },
    };

    it('should set localStorage', () => {
      handleResponse(res).set();
      expect(setItem).toHaveBeenCalledWith(
        '/path',
        JSON.stringify({
          data: { foo: 'bar' },
          ETag: 1,
          'Last-Modified': 2,
        }),
      );
    });

    it('should call onSuccess', () => {
      const stub = { onSuccess: jest.fn() };
      const message = 'Yup!';

      handleResponse({
        config: { method: 'POST' },
        status: 200,
        data: { message },
      }).notify(stub);

      expect(stub.onSuccess).toHaveBeenCalledWith('Yup!');
    });

    it('should not call onSuccess', () => {
      const stub = { onSuccess: jest.fn() };

      handleResponse({
        config: { method: 'GET' },
        status: 200,
        data: { message: '' },
      }).notify(stub);

      expect(stub.onSuccess).not.toHaveBeenCalledWith();
    });

    it('should call onFail', () => {
      const stub = { onFail: jest.fn() };
      const message = 'Nope!';

      handleResponse({
        config: { method: 'GET' },
        status: 404,
        data: { message },
      }).notify(stub);

      expect(stub.onFail).toHaveBeenCalledWith(message);
    });
  });

  describe('handleError', () => {
    it('should call onFail on 412', () => {
      const stub = { onFail: jest.fn() };

      handleError({
        response: {
          config: {},
          status: 412,
        },
      }).notify(stub);

      expect(stub.onFail).toHaveBeenCalledWith(
        expect.any(String),
      );
    });
  });

  it('should resolve from cache', () => {
    const stub = { stuff: true };
    getItem.mockReturnValue(JSON.stringify(stub));

    return expect(
      handleError({
        response: {
          config: {},
          status: 304,
        },
      }).refresh(),
    ).resolves.toMatchObject(stub);
  });

  it('should call refresh', async () => {
    const stub = {
      response: {
        config: {},
        status: 304,
      },
    };

    getItem.mockReturnValue(null);

    await expect(
      handleError(stub).refresh(),
    ).rejects.toMatchObject(stub.response);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  describe('useLoading default export', () => {
    it('should default to false', () =>
      expect(useLoading()).toBeFalsy());
  });
});
