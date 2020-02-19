import React from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import {
  useNewPassword,
  useConfirmPassword,
} from './utils';
import Field from '../builders/field';
import Form from '../builders/form';
import useFormHandler from '../providers/formik';

const { onStart, onComplete } = useFormHandler('formik');

export const handleSubmit = (values, actions) => {
  onStart(actions);
  return Axios.post('/verify', values)
    .then(({ data }) => {
      onComplete(null, actions);
      navigate('/login');
      return data;
    })
    .catch(() => {
      return null;
    });
};

const Verify = () => {
  const password = useNewPassword();
  const confirm = useConfirmPassword();

  return (
    <Form
      isNew
      onSubmit={handleSubmit}
      redirect="login"
      initialValues={{
        id: '',
        verificationCode: '',
        confirmNewPassword: '',
        newPassword: '',
      }}
    >
      <Field name="id" type="string" required />
      <Field
        name="verificationCode"
        type="string"
        required
      />
      <Field
        name="newPassword"
        type="password"
        required
        validate={password}
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

export default Verify;
