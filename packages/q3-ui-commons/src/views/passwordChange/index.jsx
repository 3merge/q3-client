import React from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Input from 'q3-ui/lib/inputs';
import Form from 'q3-ui/lib/form';
import { usePassword } from '../verify';

const PasswordChange = ({ onSubmit }) => {
  const password = usePassword();
  const { t } = useTranslation();
  const passwordChangeSchema = yup.object().shape({
    currentPassword: yup.string().required(),
    ...password.validate(),
  });

  return (
    <Form
      title={t('titles:passwordChange')}
      description={t('descriptions:passwordChange')}
      validationSchema={passwordChangeSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <>
          <Input name="currentPassword" type="password" />
          {password.render()}
        </>
      )}
    </Form>
  );
};

PasswordChange.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PasswordChange;
