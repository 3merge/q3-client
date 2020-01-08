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
        previousPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
    >
      <Field
        name="previousPassword"
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
