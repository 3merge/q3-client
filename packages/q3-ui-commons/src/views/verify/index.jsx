import React from 'react';
import Axios from 'axios';
import * as yup from 'yup';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/inputs';
import { useFormHandler } from 'q3-ui-forms';
import { FormWithAlert } from '../shared';

const { onStart, onComplete } = useFormHandler('formik');

export const handleSubmit = (values, actions) => {
  onStart(actions);
  return Axios.post('/verify', values)
    .then(({ data }) => {
      onComplete(null, actions);
      navigate('/login');
      return data;
    })
    .catch(() => {
      return null;
    });
};

export const usePassword = () => {
  const { t } = useTranslation();

  return {
    validate: () => ({
      newPassword: yup
        .string()
        .min(8)
        .max(16)
        .matches(/([a-z])+/, {
          message: t('helpers:lowercase'),
        })
        .matches(/([A-Z])+/, {
          message: t('helpers:uppercase'),
        })
        .matches(/([0-9])+/, {
          message: t('helpers:numbers'),
        })
        .matches(/([!@#$%^&*(),.?":{}|<>])+/, {
          message: t('helpers:special'),
        })
        .required(),
      confirmNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'MUST MATCH')
        .required(),
    }),
    render: () => (
      <>
        <Input name="newPassword" type="password" />
        <Input name="confirmNewPassword" type="password" />
      </>
    ),
  };
};

const Verify = () => {
  const { t } = useTranslation();
  const password = usePassword();

  const verificationSchema = yup.object().shape({
    id: yup.string().required(),
    code: yup.string().required(),
    ...password.validate(),
  });

  return (
    <FormWithAlert
      title={t('titles:verify')}
      subtitle={t('descriptions:verify')}
      handleSubmit={handleSubmit}
      sentLabel="loginReady"
      redirect="login"
      validationSchema={verificationSchema}
      initialValues={{
        code: '',
        id: '',
        confirmNewPassword: '',
        newPassword: '',
      }}
    >
      <Input name="id" type="string" />
      <Input name="code" type="string" />
      {password.render()}
    </FormWithAlert>
  );
};

export default Verify;
