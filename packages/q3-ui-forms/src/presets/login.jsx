import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { setSession } from 'q3-ui-permissions';
import Field from '../builders/field';
import Form from '../builders/form';
import useFormHandler from '../providers/formik';

const { onStart, onComplete } = useFormHandler('formik');

const Login = ({
  children,
  beforeRedirect,
  redirectPath,
}) => {
  const authenticate = (values, actions) => {
    onStart(actions);
    return Axios.post('/authenticate', values)
      .then(({ data }) => {
        setSession(data);
        actions.setStatus(
          'Success:authenticationSuccessful',
        );

        onComplete(null, actions);

        if (beforeRedirect) {
          return beforeRedirect(data).then((r) => {
            window.location.replace(redirectPath);
            return r;
          });
        }

        window.location.replace(redirectPath);
        return data;
      })
      .catch((err) => {
        onComplete(err, actions);
        actions.setStatus('Error:authenticationFailed');
        return null;
      });
  };

  return (
    <Form
      isNew
      onSubmit={authenticate}
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
  beforeRedirect: PropTypes.func,
  children: PropTypes.node,
};

Login.defaultProps = {
  redirectPath: '/',
  beforeRedirect: null,
  children: null,
};

export default Login;
