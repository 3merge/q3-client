import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Input, Form } from '../../components';

const PasswordReset = ({ onSubmit }) => {
  const { t } = useTranslation();
  const passwordResetSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
  });

  return (
    <Form
      title={t('titles:resetPassword')}
      description={t('descriptions:resetPassword')}
      onSubmit={onSubmit}
      validationSchema={passwordResetSchema}
      initialValues={{
        email: '',
      }}
    >
      {() => <Input name="email" type="email" />}
    </Form>
  );
};

PasswordReset.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordReset;
