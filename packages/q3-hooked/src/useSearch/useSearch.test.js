import React from 'react';
import { t } from 'react-i18next';
import { get } from 'axios';
import { useLocation } from '@reach/router';
import { browser, array } from 'q3-ui-helpers';
import useSearch from './useSearch';

let setState;
let spy;

jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('react-i18next', () => {
  const trans = jest.fn().mockImplementation((v) => v);
  return {
    t: trans,
    useTranslation: jest.fn().mockReturnValue({
      t: trans,
    }),
  };
});

jest.mock('q3-ui-helpers', () => ({
  browser: {
    proxyLocalStorageApi: jest.fn(),
  },
}));

jest.mock('@reach/router', () => ({
  useLocation: jest.fn().mockReturnValue({
    search: '?search=hello-world',
  }),
}));
// jest.mock('@reach/router');

beforeEach(() => {
  browser.proxyLocalStorageApi.mockClear();
  setState = jest.fn();
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  spy = jest
    .spyOn(React, 'useState')
    .mockImplementation((defaultValue) => [
      defaultValue,
      setState,
    ]);
});

it('shoul', () => {
  useSearch('hi', ['get']);
});

describe('useSearch', () => {
  it('should call resolver on search query change', () => {
    useSearch('weather', ['/search']);
    expect(get).toHaveBeenCalledWith('/search', {
      params: {
        search: 'weather',
      },
    });
  });

  it('should call translate each result in resolver response', (done) => {
    get.mockResolvedValue({
      collection1: [
        {
          id: 1,
          name: 'Test',
        },
      ],
      collection2: [
        {
          id: 1,
          title: 'Test1',
        },
      ],
    });

    useSearch('search', ['/get']);
    setTimeout(() => {
      expect(t).toHaveBeenCalledWith('collection1.title', {
        id: 1,
        name: 'Test',
      });

      expect(setState).toHaveBeenCalledWith({
        collection1: [
          {
            title: 'collection1.title',
            description: 'collection1.description',
          },
        ],
        collection2: [
          {
            title: 'collection2.title',
            description: 'collection2.description',
          },
        ],
      });

      done();
    }, 0);
  });

  it('should do custom sort', () => {
    useLocation.mockReturnValue({
      pathname: 'foo',
    });

    spy.mockReturnValue([
      {
        'quuz': [],
        foo: [],
        'foo-bar': [],
        'zoink': [],
        'bar': [],
      },
      jest.fn(),
    ]);
    const { result } = useSearch('search', ['/get'], {
      sortBy: ['quuz', 'foo-bar'],
    });
    expect(Object.keys(result)).toEqual([
      'foo',
      'quuz',
      'foo-bar',
      'bar',
      'zoink',
    ]);
  });

  it('should do custom sort and ignore location', () => {
    useLocation.mockReturnValue({
      pathname: 'foo',
    });

    spy.mockReturnValue([
      {
        'quuz': [],
        foo: [],
        'foo-bar': [],
        'zoink': [],
        'bar': [],
      },
      jest.fn(),
    ]);

    const { result } = useSearch('search', ['/get'], {
      sortBy: ['quuz', 'foo-bar'],
      ignoreLocation: true,
    });

    expect(Object.keys(result)).toEqual([
      'quuz',
      'foo-bar',
      'bar',
      'foo',
      'zoink',
    ]);
  });

  it('should store search term in localStorage', () => {
    useSearch('weather', ['/search']);

    setTimeout(() => {
      expect(
        browser.proxyLocalStorageApi,
      ).toHaveBeenCalledWith('setItem', 'weather');
    }, 0);
  });
});
