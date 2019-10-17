import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/inputs';
import Form from 'q3-ui/form';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';

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

  return (
    <Form
      {...formProps}
      title={t('titles:login')}
      description={t('descriptions:login')}
      onSubmit={(...args) =>
        hasAccount
          ? onSubmit(...args)
          : onCheck(...args).then((e) => {
              if (e) setHasAccount(e);
            })
      }
      initialValues={{
        email: '',
        password: '',
      }}
    >
      {() => (
        <>
          <Collapse in={!hasAccount}>
            <Input name="email" type="email" />
          </Collapse>
          <Collapse in={hasAccount} timeout={500}>
            <Input name="password" type="password" />
          </Collapse>
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
