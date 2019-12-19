import React from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import Field from '../builders/field';
import Form from '../builders/form';
import useFormHandler from '../providers/formik';
import Next from '../builders/next';

const { onStart, onComplete } = useFormHandler('formik');

export const handleSubmit = (values, actions) => {
  onStart(actions);
  return Axios.post('/password-reset', values)
    .then(({ data }) => {
      onComplete(null, actions);
      navigate('/login');
      return data;
    })
    .catch(() => {
      return null;
    });
};

const PasswordReset = ({ children }) => (
  <Form
    isNew
    onSubmit={handleSubmit}
    initialValues={{
      email: '',
    }}
  >
    <Field name="email" type="email" required />
    {children}
    <Next size="large" submit label="Reset" />
  </Form>
);

export default PasswordReset;
