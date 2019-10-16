import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/inputs';
import Form from 'q3-ui/form';

const Login = ({
  formProps,
  onCheck,
  onSubmit,
  children,
}) => {
  const { t } = useTranslation();
  const [hasAccount, setHasAccount] = React.useState(false);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required(),
  });

  return hasAccount ? (
    <Form
      {...formProps}
      title={t('titles:login')}
      description={t('descriptions:login')}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
      initialValues={{
        email: hasAccount,
        password: '',
      }}
    >
      {() => <Input name="password" type="password" />}
    </Form>
  ) : (
    <Form
      {...formProps}
      title={t('titles:login')}
      description={t('descriptions:login')}
      onSubmit={({ email }, actions) =>
        onCheck(email)
          .then((v) => {
            setHasAccount(v);
            actions.setSubmitting(false);
          })
          .catch(() => {
            actions.setErrors({
              email: t('validations:unknownEmail'),
            });
            actions.setSubmitting(false);
            Object.assign(actions, {
              isTouched: true,
            });
          })
      }
      initialValues={{
        email: '',
      }}
    >
      {() => (
        <>
          <Input name="email" type="email" required />
          {children}
        </>
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
