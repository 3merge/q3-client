import React from 'react';
import { isLoggedIn } from '..';

const spy = jest.spyOn(React, 'useContext');

describe('Permissions', () => {
  describe('"isLoggedIn"', () => {
    it('should return false', () => {
      spy.mockReturnValue(null);
      expect(isLoggedIn()).toBeFalsy();
    });

    it('should return truthy', () => {
      spy.mockReturnValue({
        state: { profile: { id: 1 } },
      });
      expect(isLoggedIn()).toBeTruthy();
    });
  });
});
