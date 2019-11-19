import React from 'react';
import Axios from 'axios';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/lib/inputs';
import { useFormHandler } from 'q3-ui-forms';
import { setSession } from 'q3-ui-permissions';
import Collapse from '@material-ui/core/Collapse';
import { FormWithAlert } from '../shared';

const { onStart, onComplete } = useFormHandler('formik');

export const validateAccountEmail = (
  values = {},
  actions,
) => {
  onStart(actions);
  return Axios.get(`/authenticate?email=${values.email}`)
    .then(() => {
      onComplete(null, actions);
      return values.email;
    })
    .catch(() => {
      return null;
    });
};

export const authenticate = (values, actions) => {
  onStart(actions);
  return Axios.post('/authenticate', values)
    .then(({ data }) => {
      setSession(data);
      onComplete(null, actions);
      window.location.replace('/');
      return data;
    })
    .catch((err) => {
      onComplete(err, actions);
      return null;
    });
};

const Login = (props) => {
  const { t } = useTranslation();
  const [hasAccount, setHasAccount] = React.useState('');

  const customTest = function conditionalRequire(v) {
    return !hasAccount || (hasAccount && v);
  };

  const handleSubmit = (...args) =>
    hasAccount
      ? authenticate(...args)
      : validateAccountEmail(...args).then((e) => {
          if (e) setHasAccount(e);
          return e;
        });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .test('withEmail', t('labels:required'), customTest),
  });

  return (
    <FormWithAlert
      {...props}
      redirect="reset-password"
      title={t('titles:login')}
      description={t('descriptions:login')}
      sentLabel="unknownAccount"
      validationSchema={loginSchema}
      handleSubmit={handleSubmit}
      initialValues={{
        email: hasAccount,
        password: '',
      }}
    >
      <Collapse in={!hasAccount}>
        <Input name="email" type="email" />
      </Collapse>
      <Collapse in={hasAccount} timeout={500}>
        <Input name="password" type="password" />
      </Collapse>
    </FormWithAlert>
  );
};

export default Login;
