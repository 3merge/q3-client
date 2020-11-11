import React from 'react';
import { t } from 'react-i18next';
import { get } from 'axios';
import { useLocation } from '@reach/router';
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

jest.mock('@reach/router', () => ({
  useLocation: jest.fn().mockReturnValue({
    search: '?search=hello-world',
  }),
}));

beforeEach(() => {
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
    get.mockResolvedValue({});
    useSearch(['/search']);
    expect(get).toHaveBeenCalledWith('/search', {
      params: {
        search: 'hello-world',
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

    useSearch(['/get']);
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

  it.only('should move the active collection to top of state', () => {
    useLocation.mockReturnValue({
      pathname: 'foo',
      search: '?',
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

    expect(Object.keys(useSearch(['/get']))).toEqual([
      'foo',
      'bar',
      'foo-bar',
      'quuz',
      'zoink',
    ]);
  });

  it.todo(
    'should re-order state based on active, priority and then alphabetization',
  );
});
