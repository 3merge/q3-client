import mockAxios from 'jest-mock-axios';
import Cookie from 'js-cookie';
import {
  authenticate,
  validateAccountEmail,
  resetPassword,
} from '../reducer';
import { NONCE, TOKEN } from '../constants';

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
  mockAxios.reset();
});

describe('Validate email', () => {
  it('should return address', (done) => {
    const email = 'foo@gmail.com';
    validateAccountEmail(email).then((resp) => {
      expect(resp).toMatch(email);
      done();
    });
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/authenticate?email=${email}`,
    );
    mockAxios.mockResponse({});
  });
});

describe('Authenticate', () => {
  it('should set cookies on success', (done) => {
    authenticate({}).then(() => {
      expect(Cookie.set).toHaveBeenCalledWith(NONCE, 1);
      expect(Cookie.set).toHaveBeenCalledWith(TOKEN, 1);
      expect(replace).toHaveBeenCalledWith('/');
      done();
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      '/authenticate',
      {},
    );

    mockAxios.mockResponse({
      data: {
        token: 1,
        nonce: 1,
      },
    });
  });

  it('should return the error data', (done) => {
    authenticate({}).catch(() => {
      done();
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      '/authenticate',
      {},
    );

    mockAxios.mockError({
      data: {},
    });
  });
});

describe('Reset password', () => {
  it('should return message', (done) => {
    resetPassword({}).then((resp) => {
      expect(resp.message).toMatch('If');
      done();
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      '/password-reset',
      {},
    );

    mockAxios.mockResponse({
      data: {
        message: 'If',
      },
    });
  });

  it('should return error message', (done) => {
    resetPassword({}).catch((resp) => {
      expect(resp.message).toMatch('If');
      done();
    });

    expect(mockAxios.post).toHaveBeenCalledWith(
      '/password-reset',
      {},
    );

    mockAxios.mockError({
      data: {
        message: 'If',
      },
    });
  });
});

describe('Verify', () => {
  it('should return message', () => {});
});
