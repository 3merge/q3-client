import React from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/inputs';
import { useFormHandler } from 'q3-ui-forms';
import { FormWithAlert, emailValidation } from '../shared';

const { onStart, onComplete } = useFormHandler('formik');

export const handleSubmit = (values, actions) => {
  onStart(actions);
  return Axios.post('/password-reset', values)
    .then(({ data }) => {
      onComplete(null, actions);
      navigate('/login');
      return data;
    })
    .catch(() => {
      return null;
    });
};

const PasswordReset = () => {
  const { t } = useTranslation();

  return (
    <FormWithAlert
      title={t('titles:passwordReset')}
      description={t('descriptions:passwordReset')}
      validationSchema={emailValidation}
      handleSubmit={handleSubmit}
      sentLabel="emailSent"
      redirect="login"
      initialValues={{
        email: '',
      }}
    >
      <Input name="email" type="email" />
    </FormWithAlert>
  );
};

export default PasswordReset;
