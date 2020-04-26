import React from 'react';
import PropTypes from 'prop-types';
import { NewPasswordHelpers } from './passwordChange';
import Field from '../builders/field';
import Form from '../builders/form';
import { handleSubmitWrapper } from './utils';

const Verify = ({ id, verificationCode, ...rest }) => (
  <Form
    {...rest}
    initialValues={{
      id,
      verificationCode,
      confirmNewPassword: '',
      newPassword: '',
    }}
  >
    <Field name="id" type="string" required />
    <Field name="verificationCode" type="string" required />
    <NewPasswordHelpers />
  </Form>
);

Verify.propTypes = {
  id: PropTypes.string,
  verificationCode: PropTypes.string,
  onSubmit: PropTypes.func,
};

Verify.defaultProps = {
  id: '',
  verificationCode: '',
  onSubmit: handleSubmitWrapper('/verify', {
    onSuccessStatus: 'verificationSuccess',
    onErrorStatus: 'verificationFailed',
  }),
};

export default Verify;
