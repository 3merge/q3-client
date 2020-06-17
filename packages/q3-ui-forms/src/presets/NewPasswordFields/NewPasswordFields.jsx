import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Field } from '../../builders';
import NewPasswordStrengthIndicator from '../NewPasswordStrengthIndicator';
import {
  hasLowercase,
  hasUppercase,
  hasNumber,
  hasSpecialCharacter,
} from '../NewPasswordStrengthIndicator/NewPasswordStrengthIndicator';
import NewPasswordConfirmation from '../NewPasswordConfirmation';

export const NewPasswordFields = (props) => {
  const ref = React.useRef();
  const { newPassword } = props;

  React.useEffect(() => {
    ref.current = newPassword;
  }, [newPassword]);

  return (
    <>
      <Field
        name="newPassword"
        type="password"
        validate={yup
          .string()
          .min(8)
          .max(16)
          .matches(hasLowercase)
          .matches(hasUppercase)
          .matches(hasNumber)
          .matches(hasSpecialCharacter)
          .required()}
        suppressHelper
        required
        xl={12}
        lg={12}
      />
      <NewPasswordStrengthIndicator {...props} />
      <Field
        name="confirmNewPassword"
        type="password"
        listen={['newPassword']}
        validate={yup
          .string()
          .test(
            'matches',
            'This value must match the new password',
            (value) => value === ref.current,
          )}
        suppressHelper
        required
        xl={12}
        lg={12}
      />
      <NewPasswordConfirmation {...props} />
    </>
  );
};

NewPasswordFields.propTypes = {
  newPassword: PropTypes.string.isRequired,
};

export default NewPasswordFields;
