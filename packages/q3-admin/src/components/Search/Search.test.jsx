import React from 'react';
import { useNavigate, useLocation } from '@reach/router';
import Search from './Search';
import SearchFullWidth from '../SearchFullWidth';

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    collectionName: 'orders',
    directoryPath: 'app/orders/',
  });
});

jest.mock('@reach/router', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('Search', () => {
  it('should set default value b', () => {
    useLocation.mockReturnValue({
      search: '?search=foo',
    });

    expect(
      global
        .shallow(<Search />)
        .find(SearchFullWidth)
        .props(),
    ).toHaveProperty('value', 'foo');
  });

  it('should set placeholder value by prop', () =>
    expect(
      global
        .shallow(<Search />)
        .find(SearchFullWidth)
        .props(),
    ).toHaveProperty(
      'placeholder',
      'ordersSearchPlaceholder',
    ));

  it.each([['Enter'], ['NumpadEnter'], ['Enter', 'key']])(
    'should navigate on enter',
    (value, key = 'code') => {
      const navigate = jest.fn();
      useNavigate.mockReturnValue(navigate);
      useLocation.mockReturnValue({
        pathname: 'root',
      });

      global
        .shallow(<Search />)
        .find(SearchFullWidth)
        .prop('onKeyPress')({
        [key]: value,
        target: {
          value: 'test',
        },
      });

      expect(navigate).toHaveBeenCalledWith(
        'app/orders/?search=test',
      );
    },
  );
});
