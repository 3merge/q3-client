import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Input, Form } from '../../components';

const Login = ({ onSubmit }) => {
  const { t } = useTranslation();
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required(),
  });

  return (
    <Form
      title={t('titles:login')}
      description={t('descriptions:login')}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
      initialValues={{
        email: '',
        password: '',
      }}
    >
      {() => (
        <>
          <Input name="email" type="email" />
          <Input name="password" type="password" />
        </>
      )}
    </Form>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Login;
