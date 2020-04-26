import React from 'react';
import Axios from 'axios';
import { browser } from 'q3-ui-helpers';
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
      actions.setStatus('Success:verificationSuccess');
      browser.redirectIn();
      return data;
    })

    .catch((err) => {
      onComplete(err, actions);
      actions.setStatus('Error:verificationFailed');
      return null;
    });
};

const Verify = ({ id, verificationCode, onSubmit }) => (
  <Form
    isNew
    onSubmit={onSubmit}
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
  onSubmit: PropTypes.func,
};

Verify.defaultProps = {
  id: '',
  verificationCode: '',
  onSubmit: handleSubmit,
};

export default Verify;
