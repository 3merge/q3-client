import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/inputs';
import Form from 'q3-ui/form';

const PasswordReset = ({ onSubmit }) => {
  const { t } = useTranslation();

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
