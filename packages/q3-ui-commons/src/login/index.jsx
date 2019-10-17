import React from 'react';
import Axios from 'axios';
import { navigate, Link } from '@reach/router';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/inputs';
import Form from 'q3-ui/form';
import { useFormHandler } from 'q3-ui-forms';
import { setSession } from 'q3-ui-permissions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Security from '../security';

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
    .catch((err) => {
      onComplete(err, actions);
      return null;
    });
};

export const authenticate = (values, actions) => {
  onStart(actions);
  return Axios.post('/authenticate', values)
    .then(({ data }) => {
      setSession(data);
      onComplete(null, actions);
      navigate('/');
      return data;
    })
    .catch((err) => {
      onComplete(err, actions);
      return null;
    });
};

const Login = ({ formProps }) => {
  const { t } = useTranslation();
  const [hasAccount, setHasAccount] = React.useState('');
  const [init, setInit] = React.useState(false);

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
    <Form
      {...formProps}
      readOnly={!init}
      title={t('titles:login')}
      description={t('descriptions:login')}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
      initialValues={{
        email: hasAccount,
        password: '',
      }}
    >
      {() => (
        <Security done={setInit}>
          <Collapse in={!hasAccount}>
            <Input name="email" type="email" />
          </Collapse>
          <Collapse in={hasAccount} timeout={500}>
            <Input name="password" type="password" />
          </Collapse>{' '}
          <Box align="right">
            <Button component={Link} to="/reset-password">
              {t('labels:forgotPassword')}
            </Button>
          </Box>
        </Security>
      )}
    </Form>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func,
  onCheck: PropTypes.func,
  formProps: PropTypes.shape({}),
  children: PropTypes.node,
};

Login.defaultProps = {
  onCheck: () => Promise.resolve(),
  onSubmit: () => Promise.resolve(),
  formProps: null,
  children: null,
};

export default Login;
