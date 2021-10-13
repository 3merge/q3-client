import 'jest-localstorage-mock';
import React from 'react';
import axios from 'axios';
import useLoading, { handleResponse, handleError } from '.';

jest.useFakeTimers();

jest
  .spyOn(React, 'useState')
  .mockImplementation((v) => [v, jest.fn()]);

jest.spyOn(React, 'useEffect').mockImplementation((v) => {
  const r = v();
  if (r) r();
});

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
  describe('handleResponse', () => {
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

  describe('useLoading default export', () => {
    it('should default to false', () =>
      expect(useLoading()).toBeFalsy());

    it('should register/unregister intercepts', () => {
      useLoading();
      expect(
        axios.interceptors.request.use,
      ).toHaveBeenCalled();

      expect(
        axios.interceptors.response.use,
      ).toHaveBeenCalled();

      expect(
        axios.interceptors.request.eject,
      ).toHaveBeenCalled();

      expect(
        axios.interceptors.response.eject,
      ).toHaveBeenCalled();
    });
  });
});
