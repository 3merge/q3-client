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
  it('should set default value by search', () => {
    useLocation.mockReturnValue({
      search: '?search=foo',
    });

    expect(
      global
        .shallow(<Search />)
        .find(SearchFullWidth)
        .props(),
    ).toHaveProperty('defaultValue', 'foo');
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

  it('should navigate on enter', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    useLocation.mockReturnValue({
      pathname: 'root',
    });

    global
      .shallow(<Search />)
      .find(SearchFullWidth)
      .prop('onKeyPress')({
      code: 'Enter',
      target: {
        value: 'test',
      },
    });

    expect(navigate).toHaveBeenCalledWith(
      'app/orders/?search=test',
    );
  });
});
