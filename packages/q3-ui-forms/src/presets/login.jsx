import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [hasAccount] = React.useState('');

  const authenticate = (values, actions) => {
    onStart(actions);
    return Axios.post('/authenticate', values)
      .then(({ data }) => {
        setSession(data);
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
        return null;
      });
  };

  const customTest = function conditionalRequire(v) {
    return !hasAccount || (hasAccount && v);
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
      <Field name="email" type="email" />
      <Field
        required
        name="password"
        type="password"
        validate={yup
          .string()
          .test(
            'withEmail',
            t('labels:required'),
            customTest,
          )}
      />
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
