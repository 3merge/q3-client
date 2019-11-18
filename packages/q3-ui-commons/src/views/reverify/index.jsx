import React from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/lib/inputs';
import { useFormHandler } from 'q3-ui-forms';
import { FormWithAlert, emailValidation } from '../shared';

const { onStart, onComplete } = useFormHandler('formik');

export const handleSubmit = (values, actions) => {
  onStart(actions);
  return Axios.post('/reverify', values)
    .then(({ data }) => {
      onComplete(null, actions);
      navigate('/verify');
      return data;
    })
    .catch(() => {
      return null;
    });
};

const Reverify = () => {
  const { t } = useTranslation();

  return (
    <FormWithAlert
      title={t('titles:reverify')}
      subtitle={t('descriptions:reverify')}
      validationSchema={emailValidation}
      handleSubmit={handleSubmit}
      sentLabel="emailSent"
      redirect="verify"
      initialValues={{
        email: '',
      }}
    >
      <Input name="email" type="email" />
    </FormWithAlert>
  );
};

export default Reverify;
