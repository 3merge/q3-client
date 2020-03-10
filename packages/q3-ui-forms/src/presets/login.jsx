import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { setSession } from 'q3-ui-permissions';
import Field from '../builders/field';
import Form from '../builders/form';
import useFormHandler from '../providers/formik';

const { onStart, onComplete } = useFormHandler('formik');

const authenticate = (to) => (values, actions) => {
  onStart(actions);
  return Axios.post('/authenticate', values)
    .then(({ data }) => {
      actions.setStatus('Success:authenticationSuccessful');
      setSession(data);
      onComplete(null, actions);
      window.location.replace(to);
      return data;
    })
    .catch((err) => {
      onComplete(err, actions);
      actions.setStatus('Error:authenticationFailed');
      return null;
    });
};

const Login = ({ children, redirectPath }) => {
  return (
    <Form
      isNew
      onSubmit={authenticate(redirectPath)}
      initialValues={{
        email: '',
        password: '',
      }}
    >
      <Field name="email" type="email" required />
      <Field required name="password" type="password" />
      {children}
    </Form>
  );
};

Login.propTypes = {
  redirectPath: PropTypes.string,
  children: PropTypes.node,
};

Login.defaultProps = {
  redirectPath: '/',
  children: null,
};

export default Login;
