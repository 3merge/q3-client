import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import useUploadsAuth from './useUploadsAuth';

jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn(),
}));

beforeAll(() => {
  jest
    .spyOn(React, 'useMemo')
    .mockImplementation((fn) => fn());
});

describe('useUploadsAuth', () => {
  it('should iterate through auth props', () => {
    const authState = {
      canCreateSub: jest.fn().mockReturnValue(true),
      canEditSub: jest.fn().mockReturnValue(false),
      canSeeSub: jest.fn().mockReturnValue(true),
    };

    useAuth.mockReturnValue(authState);
    expect(useUploadsAuth()).toMatchObject({
      canCreate: true,
      canEdit: false,
      canSee: true,
      canDelete: false,
    });

    Object.values(authState).forEach((fn) => {
      expect(fn).toHaveBeenCalledWith('uploads');
    });
  });
});
