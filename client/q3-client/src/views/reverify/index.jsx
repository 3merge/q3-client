import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Bot, Input, Form } from '../../components';

const Reverify = ({ onSubmit }) => {
  const { t } = useTranslation();
  const revierfySchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    recaptcha: yup.string().required(),
  });

  return (
    <Form
      title={t('titles:reverify')}
      description={t('descriptions:reverify')}
      onSubmit={onSubmit}
      validationSchema={revierfySchema}
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

Reverify.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Reverify;
