import React from 'react';
import { navigate as nav } from '@reach/router';
import { browser } from 'q3-ui-helpers';
import useBack from './useBack';

jest.mock('@reach/router', () => {
  const navigate = jest.fn().mockResolvedValue(undefined);
  return {
    useNavigate: jest.fn().mockReturnValue(navigate),
    navigate,
  };
});

jest.mock(
  '../containers/BackProvider/BackProvider',
  () => ({
    getPageHistory: jest
      .fn()
      .mockReturnValue(['/app/', '/app/tests?sort=name']),
  }),
);

describe('useBack', () => {
  it('should call directory', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      directoryPath: '/app/',
      id: 1,
    });

    useBack()();
    expect(nav).toHaveBeenCalledWith('/app/');
  });

  it('should call history', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      directoryPath: '/app/tests',
      id: 1,
    });

    useBack()();
    expect(nav).toHaveBeenCalledWith(
      '/app/tests?sort=name',
    );
  });

  it('should call history with trailing slash', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      directoryPath: '/app/tests/',
      id: 1,
    });

    useBack()();
    expect(nav).toHaveBeenCalledWith(
      '/app/tests?sort=name',
    );
  });

  it('should call directory on mismatch', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      directoryPath: '/app/tests-latest',
      id: 1,
    });

    useBack()();
    expect(nav).toHaveBeenCalledWith('/app/');
  });
});
