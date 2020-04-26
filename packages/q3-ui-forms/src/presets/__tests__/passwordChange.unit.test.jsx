import React from 'react';
import PasswordChange, {
  PasswordValidationChecklist,
} from '../passwordChange';

describe('PasswordChange', () => {
  describe('"PasswordValidationChecklist"', () => {
    it('should report back', () => {
      expect(
        global
          .shallow(<PasswordValidationChecklist />)
          .find('li'),
      ).toHaveLength(4);
    });
  });
});
