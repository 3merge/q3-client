import React from 'react';
import { t } from 'react-i18next';
import { get } from 'axios';
import { browser } from 'q3-ui-helpers';
import useSearch, { CustomSort } from './useSearch';

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

  it('should sort by alphabetically then do collection sort', () => {
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

    const result = CustomSort.of({
      'quuz': [],
      foo: [],
      'foo-bar': [],
      'zoink': [],
      'bar': [],
    })
      .alphabetSort()
      .collectionSort(['bar', 'foo-bar', 'zoink'])
      .extract();

    expect(Object.keys(result)).toEqual([
      'bar',
      'foo-bar',
      'zoink',
      'foo',
      'quuz',
    ]);
  });

  it('should do custom sort then sort by location', () => {
    const result = CustomSort.of({
      'quuz': [],
      foo: [],
      'foo-bar': [],
      'zoink': [],
      'bar': [],
    })
      .alphabetSort()
      .collectionSort(['quuz', 'foo-bar', 'zoink'])
      .locationSort({ pathname: 'foo-bar' })
      .extract();

    expect(Object.keys(result)).toEqual([
      'foo-bar',
      'quuz',
      'zoink',
      'bar',
      'foo',
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
