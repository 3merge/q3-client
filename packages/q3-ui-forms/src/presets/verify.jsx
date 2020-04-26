import React from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { NewPasswordHelpers } from './passwordChange';
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

const Verify = ({ id, verificationCode }) => (
  <Form
    isNew
    onSubmit={handleSubmit}
    redirect="login"
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
};

Verify.defaultProps = {
  id: '',
  verificationCode: '',
};

export default Verify;
