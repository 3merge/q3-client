import React from 'react';
import { navigate as nav } from '@reach/router';
import { browser } from 'q3-ui-helpers';
import useBack from './useBack';

jest.mock('@reach/router', () => {
  const navigate = jest.fn();
  return {
    useNavigate: jest.fn().mockReturnValue(navigate),
    navigate,
  };
});

jest.spyOn(React, 'useContext').mockReturnValue({
  directoryPath: '/app',
});

describe('useBack', () => {
  it('should call directory', () => {
    useBack()();
    expect(nav).toHaveBeenCalledWith('/app');
  });

  it('should call history', () => {
    jest
      .spyOn(browser, 'proxySessionStorageApi')
      .mockReturnValue('/app?sort=123');
    useBack()();
    expect(nav).toHaveBeenCalledWith('/app?sort=123');
  });

  it('should call directory on mismatch', () => {
    jest
      .spyOn(browser, 'proxySessionStorageApi')
      .mockReturnValue('/otherapp?sort=123');
    useBack()();
    expect(nav).toHaveBeenCalledWith('/app');
  });
});
