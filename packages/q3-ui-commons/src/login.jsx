import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/lib/inputs';
import Form from 'q3-ui/lib/form';

const Login = ({ formProps, onSubmit, children }) => {
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
      {...formProps}
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
          {children}
        </>
      )}
    </Form>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formProps: PropTypes.shape({}),
  children: PropTypes.node,
};

Login.defaultProps = {
  formProps: null,
  children: null,
};

export default Login;
