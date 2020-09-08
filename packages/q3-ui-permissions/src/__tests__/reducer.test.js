import moxios from 'jest-mock-axios';
import Cookie from 'js-cookie';
import reducer, {
  destroySession,
  setSession,
  getSession,
} from '../reducer';

const replace = jest.fn();
jest.mock('axios');
jest.mock('js-cookie');

beforeAll(() => {
  Object.defineProperty(window.location, 'replace', {
    configurable: true,
  });

  window.location.replace = replace;
});

afterEach(() => {
  moxios.reset();
});

describe('Permissions reducer', () => {
  describe('default export', () => {
    it('should return init', () =>
      expect(
        reducer(null, {
          type: 'Authenticating',
          data: { foo: 'bar' },
        }),
      ).toMatchObject({
        init: true,
        foo: 'bar',
      }));

    it('should throw an error', () =>
      expect(() =>
        reducer(null, {
          type: 'Authorizing',
          data: { foo: 'bar' },
        }),
      ).toThrowError());
  });

  // {
  //   "q3-datatables-column-employers": "industry,rating.accessible,rating.disabilities,rating.gender,rating.immigrants,rating.indigenous,rating.universalDesign"
  // }

  describe('destroySession', () => {
    it('should destroy cookies', () => {
      destroySession();
      expect(Cookie.remove).toHaveBeenCalledTimes(2);
      expect(replace).toHaveBeenCalledWith('/');
    });
  });

  describe('setSession', () => {
    it('should add cookies', () => {
      setSession({ token: 1, nonce: 1 });
      expect(Cookie.set).toHaveBeenCalledTimes(2);
    });
  });

  describe('getSession', () => {
    it('should call /profile', () => {
      const dispatch = jest.fn();
      getSession(dispatch);

      expect(moxios.get).toHaveBeenCalledWith('/profile');
      moxios.mockResponse({
        data: {
          profile: {},
          permissions: [],
        },
      });

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            profile: {},
            permissions: [],
          }),
        }),
      );
    });
  });
});
