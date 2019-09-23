import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Input, Form } from '../../components';

export const usePassword = () => {
  const { t } = useTranslation();

  return {
    validate: () => ({
      password: yup
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
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'MUST MATCH')
        .required(),
    }),
    render: () => (
      <>
        <Input name="password" type="password" />
        <Input name="confirmPassword" type="password" />
      </>
    ),
  };
};

const Verify = ({ onSubmit }) => {
  const { t } = useTranslation();
  const password = usePassword();

  const verificationSchema = yup.object().shape({
    id: yup.string().required(),
    code: yup.string().required(),
    ...password.validate(),
  });

  return (
    <Form
      title={t('titles:verify')}
      description={t('descriptions:verify')}
      onSubmit={onSubmit}
      validationSchema={verificationSchema}
      initialValues={{
        email: '',
      }}
    >
      {() => (
        <>
          <Input name="id" type="string" />
          <Input name="code" type="string" />
          {password.render()}
        </>
      )}
    </Form>
  );
};

Verify.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Verify;
