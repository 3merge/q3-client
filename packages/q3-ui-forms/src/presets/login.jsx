import React from 'react';
import Axios from 'axios';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { setSession } from 'q3-ui-permissions';
import Collapse from '@material-ui/core/Collapse';
import Field from '../builders/field';
import Form from '../builders/form';
import Next from '../builders/next';
import useFormHandler from '../providers/formik';

const { onStart, onComplete } = useFormHandler('formik');

const Login = () => {
  const { t } = useTranslation();
  const [hasAccount, setHasAccount] = React.useState('');

  const validateAccountEmail = (values = {}, actions) => {
    onStart(actions);
    return Axios.get(`/authenticate?email=${values.email}`)
      .then(() => {
        onComplete(null, actions);
        return values.email;
      })
      .catch(() => {
        actions.setFieldError(
          'email',
          t('helpers:unknownAccount'),
        );
        return null;
      });
  };

  const authenticate = (values, actions) => {
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

  return (
    <Form
      isNew
      onSubmit={handleSubmit}
      initialValues={{
        email: hasAccount,
        password: '',
      }}
    >
      <Collapse in={!hasAccount}>
        <Field name="email" type="email" />
      </Collapse>
      <Collapse in={hasAccount} timeout={500}>
        <Field
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
      </Collapse>
      <Next submit label={t('labels:login')} />
    </Form>
  );
};

export default Login;
