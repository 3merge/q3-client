import { getCached, fromCache, useCache } from '../axios';

const getItem = jest.spyOn(
  Object.getPrototypeOf(localStorage),
  'getItem',
);

const setItem = jest.spyOn(
  Object.getPrototypeOf(localStorage),
  'setItem',
);

describe('Axios interceptors', () => {
  describe('request', () => {
    it('should lookup cache', () => {
      getCached({
        baseURL: 'localhost',
        url: '/foo',
      });

      expect(getItem).toHaveBeenCalledWith('localhost/foo');
    });

    it('should append headers', () => {
      getItem.mockReturnValueOnce(
        JSON.stringify({
          'Last-Modified': 2,
          ETag: 1,
          data: {},
        }),
      );

      const headers = {
        common: {},
      };

      getCached({
        baseURL: 'localhost',
        url: '/foo',
        headers,
      });

      expect(headers.common).toHaveProperty('If-Match', 1);
      expect(headers.common).toHaveProperty(
        'If-Unmodified-Since',
        2,
      );
    });
  });

  describe('response (success)', () => {
    it('should set localStorage', () => {
      fromCache({
        data: { foo: 'bar' },
        headers: { ETag: 1, 'Last-Modified': 2 },
        config: { url: '/path' },
      });

      expect(setItem).toHaveBeenCalledWith(
        '/path',
        JSON.stringify({
          ETag: 1,
          'Last-Modified': 2,
          data: { foo: 'bar' },
        }),
      );
    });
  });

  describe('response (error)', () => {
    it('should reload if no cache exists', async () => {
      delete window.location;
      window.location = { reload: jest.fn() };

      await useCache({
        response: {
          status: 304,
          config: { url: '/foo' },
        },
      });

      expect(getItem).toHaveBeenCalledWith('/foo');
      expect(window.location.reload).toHaveBeenCalled();
    });

    it('should serve from the cache', async () => {
      const cache = {
        data: { foo: 'bar' },
      };

      getItem.mockReturnValueOnce(JSON.stringify(cache));

      const resp = await useCache({
        response: {
          status: 304,
          config: { url: '/foo' },
        },
      });

      expect(resp).toMatchObject(cache);
    });

    it('should alert the user of race conditions', async () => {
      const spy = jest
        .spyOn(window, 'alert')
        .mockReturnValueOnce();

      await expect(
        useCache({
          response: {
            config: { url: '/' },
            status: 412,
          },
        }),
      ).rejects.toBeDefined();

      expect(spy).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
