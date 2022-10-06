import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

import { useLocation, useNavigate } from '@reach/router';
import CustomPagination from './Pagination';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('CustomPagination', () => {
  it('should', () => {
    const fn = jest.fn();
    useLocation.mockReturnValue({
      search: '',
      pathname: 'foo',
    });
    useNavigate.mockReturnValue(fn);

    const { onChange, page } = global
      .shallow(<CustomPagination />)
      .find(Pagination)
      .props();

    onChange(null, 1);
    expect(page).toBe(1);
    expect(fn).toHaveBeenCalledWith('foo?page=0');
  });

  it('should', () => {
    const fn = jest.fn();
    useLocation.mockReturnValue({
      search: '?page=1',
      pathname: 'foo',
    });
    useNavigate.mockReturnValue(fn);

    const { onChange, page } = global
      .shallow(<CustomPagination />)
      .find(Pagination)
      .props();

    onChange(null, 2);
    expect(page).toBe(2);
    expect(fn).toHaveBeenCalledWith('foo?page=1');
  });
});
