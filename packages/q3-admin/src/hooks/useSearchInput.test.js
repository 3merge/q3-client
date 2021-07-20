import React from 'react';
import { useNavigate, useLocation } from '@reach/router';
import { useValue } from 'useful-state';
import useSearchInput from './useSearchInput';

jest.mock('useful-state', () => ({
  useValue: jest.fn().mockReturnValue({
    value: 'storedSearchTerm',
    onChange: jest.fn(),
    setValue: jest.fn(),
  }),
}));

jest.mock('@reach/router', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn().mockReturnValue({
    search: '?search=originalSearchTerm&filter=true',
  }),
}));

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    collectionName: 'orders',
    directoryPath: 'app/orders/',
  });

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: null,
  });
});

describe('Search', () => {
  it('should pass location to input value', () => {
    expect(useSearchInput()).toHaveProperty(
      'value',
      'storedSearchTerm',
    );

    expect(useValue).toHaveBeenCalledWith(
      'originalSearchTerm',
    );
  });

  it('should set placeholder value by prop', () =>
    expect(useSearchInput()).toHaveProperty(
      'placeholder',
      'ordersSearchPlaceholder',
    ));

  it('should restore focus on reset', () => {
    const focus = jest.fn();
    React.useRef.mockReturnValue({
      current: {
        focus,
      },
    });

    useSearchInput().handleReset();
    expect(focus).toHaveBeenCalled();
  });

  it.each([['Enter'], ['NumpadEnter'], ['Enter', 'key']])(
    'should navigate on enter',
    (value, key = 'code') => {
      const navigate = jest.fn();
      useNavigate.mockReturnValue(navigate);
      useLocation.mockReturnValue({
        pathname: 'root',
      });

      useSearchInput().onKeyPress({
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
