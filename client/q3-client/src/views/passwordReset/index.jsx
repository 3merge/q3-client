import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Bot, Input, Form } from '../../components';

const PasswordReset = ({ onSubmit }) => {
  const { t } = useTranslation();
  const passwordResetSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    recaptcha: yup.string().required(),
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
      {(utils) => (
        <>
          <Input name="email" type="email" />
          <Bot {...utils} />
        </>
      )}
    </Form>
  );
};

PasswordReset.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordReset;
