import React from 'react';
import PropTypes from 'prop-types';
import { setSession } from 'q3-ui-permissions';
import Field from '../builders/field';
import Form from '../builders/form';
import { handleSubmitWrapper } from './utils';

const Login = ({ children, redirectPath, ...rest }) => {
  return (
    <Form
      onSubmit={handleSubmitWrapper('/authenticate', {
        onSuccessStatus: 'authenticationSuccessful',
        onErrorStatus: 'authenticationFailed',
        onDone: (data) => {
          setSession(data);
          window.location.replace(redirectPath);
          return data;
        },
      })}
      initialValues={{
        email: '',
        password: '',
      }}
      {...rest}
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
