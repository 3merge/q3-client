import React from 'react';
import PropTypes from 'prop-types';
import Field from '../builders/field';
import Form from '../builders/form';
import {
  useNewPassword,
  useConfirmPassword,
} from './utils';

const PasswordChange = ({ onSubmit }) => {
  const password = useNewPassword();
  const confirm = useConfirmPassword();

  return (
    <Form
      isNew
      onSubmit={onSubmit}
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
    >
      <Field
        name="currentPassword"
        type="password"
        required
      />
      <Field
        name="newPassword"
        type="password"
        validate={password}
        required
      />
      <Field
        name="confirmNewPassword"
        type="password"
        validate={confirm}
        required
      />
    </Form>
  );
};

PasswordChange.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordChange;
