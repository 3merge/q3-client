import React from 'react';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import { useField } from 'formik';
import { Field } from '../../builders';
import PasswordChange, {
  PasswordMatch,
  PasswordHelperListItem,
  hasLowercase,
  hasUppercase,
  hasNumber,
  hasSpecialCharacter,
  hasLength,
} from '../passwordChange';

const expectRegexToFail = (re, value) =>
  expect(re.test(value)).toBeFalsy();

const expectRegexToPass = (re, value) =>
  expect(re.test(value)).toBeTruthy();

describe('PasswordChange', () => {
  describe('"PasswordValidationChecklist"', () => {
    it('should fail lowercase', () =>
      expectRegexToFail(hasLowercase, 'FOO'));

    it('should pass lowercase', () =>
      expectRegexToPass(hasLowercase, 'foo'));

    it('should fail uppercase', () =>
      expectRegexToFail(hasUppercase, 'foo'));

    it('should pass uppercase', () =>
      expectRegexToPass(hasUppercase, 'FOO'));

    it('should fail number', () =>
      expectRegexToFail(hasNumber, 'abc'));

    it('should pass number', () =>
      expectRegexToPass(hasNumber, 123));

    it('should fail special character', () =>
      expectRegexToFail(hasSpecialCharacter, 123));

    it('should pass special character', () =>
      expectRegexToPass(hasSpecialCharacter, '!$'));

    it('should pass length test', () => {
      expect(hasLength('abc12345')).toBeTruthy();
    });

    it('should fail length test', () => {
      expect(hasLength('ac')).toBeFalsy();
    });
  });

  describe('"PasswordHelperListItem"', () => {
    it('should have Close icon', () =>
      expect(
        global
          .shallow(
            <PasswordHelperListItem
              name="foo"
              re={hasLowercase}
              value="NOOP"
            />,
          )
          .find(Close),
      ).toHaveLength(1));

    it('should have Check icon', () =>
      expect(
        global
          .shallow(
            <PasswordHelperListItem
              name="foo"
              re={hasLowercase}
              value="yup"
            />,
          )
          .find(Check),
      ).toHaveLength(1));
  });

  describe('"PasswordMatch"', () => {
    const getRe = (value) => {
      useField
        .mockReturnValueOnce([{ value: 'a' }])
        .mockReturnValueOnce([{ value }]);
      return global
        .shallow(<PasswordMatch />)
        .find(PasswordHelperListItem)
        .props().re;
    };

    it('should not match', () => {
      expect(getRe('b')()).toBeFalsy();
    });

    it('should  match', () => {
      expect(getRe('a')()).toBeTruthy();
    });
  });

  describe('"PasswordChange"', () => {
    const measureFields = (props) =>
      global
        .shallow(<PasswordChange {...props} />)
        .find(Field);
    it('should exclude previous password', () => {
      expect(
        measureFields({ passwordResetToken: '123' }),
      ).toHaveLength(0);
    });

    it('should include previous password', () => {
      expect(
        measureFields({ passwordResetToken: '' }),
      ).toHaveLength(1);
    });
  });
});
