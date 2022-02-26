import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import useCanEditField from './useCanEditField';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

describe('useCanEditField', () => {
  it('should return truthy without a collection name', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({});
    useAuth.mockReturnValue({
      canEditSub: jest.fn().mockReturnValue(true),
    });

    expect(useCanEditField()).toBeTruthy();
  });

  it('should return truthy when editable', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      collectionName: 'testing',
    });

    useAuth.mockReturnValue({
      canEditSub: jest.fn().mockReturnValue(true),
    });

    expect(useCanEditField()).toBeTruthy();
  });

  it('should return falsy when not editable', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      collectionName: 'testing',
    });

    useAuth.mockReturnValue({
      canEditSub: jest.fn().mockReturnValue(false),
    });

    expect(useCanEditField()).toBeFalsy();
  });
});
