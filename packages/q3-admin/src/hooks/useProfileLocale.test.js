import React from 'react';
import { browser } from 'q3-ui-helpers';
import useProfileLocale from './useProfileLocale';

let spy;
const { proxyLocalStorageApi } = browser;
const reload = jest.fn();

jest.mock('q3-ui-helpers', () => ({
  browser: {
    isBrowserReady: jest.fn().mockReturnValue(true),
    proxyLocalStorageApi: jest.fn().mockReturnValue('en'),
  },
}));

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: {
      reload,
    },
  });

  spy = jest.spyOn(React, 'useContext');

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  proxyLocalStorageApi.mockClear();
});

describe('useProfileLocale', () => {
  it('should set locale storage', () => {
    spy.mockReturnValue({
      state: {
        profile: {
          lang: 'en',
        },
      },
    });

    useProfileLocale();
    expect(reload).not.toHaveBeenCalled();
    expect(proxyLocalStorageApi).toHaveBeenCalledTimes(2);
  });

  it('should reload page on language change', () => {
    spy.mockReturnValue({
      state: {
        profile: {
          lang: 'fr',
        },
      },
    });

    useProfileLocale();
    expect(reload).toHaveBeenCalled();
    expect(proxyLocalStorageApi).toHaveBeenCalledTimes(2);
  });
});
