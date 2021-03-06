import 'jest-localstorage-mock';
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

beforeAll(() => {
  Object.defineProperty(window.location, 'reload', {
    writable: true,
  });

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
      expect(localStorage.getItem).toHaveBeenCalledWith(
        'localhost/foo',
      );
    });

    it('should attach etag headers', () => {
      localStorage.getItem.mockReturnValue(
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

    it.skip('should set localStorage', () => {
      handleResponse(res).set();
      expect(localStorage.setItem).toHaveBeenCalledWith(
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

    it.skip('should call onFail', () => {
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
    it.skip('should call onFail on 412', () => {
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

  it.skip('should resolve from cache', () => {
    const stub = { stuff: true };
    localStorage.getItem.mockReturnValue(
      JSON.stringify(stub),
    );

    return expect(
      handleError({
        response: {
          config: { method: 'get' },
          status: 304,
        },
      }).refresh(),
    ).resolves.toMatchObject(stub);
  });

  it.skip('should call refresh', async () => {
    const stub = {
      response: {
        config: {},
        status: 304,
      },
    };

    localStorage.getItem.mockReturnValue(null);

    await expect(
      handleError(stub).refresh(),
    ).rejects.toMatchObject(stub);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  describe('useLoading default export', () => {
    it.skip('should default to false', () =>
      expect(useLoading()).toBeFalsy());
  });
});
