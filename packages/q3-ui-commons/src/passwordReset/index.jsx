import React from 'react';
import Axios from 'axios';
import { navigate, Link } from '@reach/router';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/inputs';
import Form from 'q3-ui/form';
import { useFormHandler } from 'q3-ui-forms';
import { setSession } from 'q3-ui-permissions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Security from '../security';

const { onStart, onComplete } = useFormHandler('formik');

export const handleSubmit = (values, actions) => {
  onStart(actions);
  return Axios.post('/password-reset', values)
    .then(({ data }) => {
      setSession(data);
      onComplete(null, actions);
      navigate('/login');
      return data;
    })
    .catch((err) => {
      onComplete(err, actions);
      return null;
    });
};

const PasswordReset = ({ formProps }) => {
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
  });

  return (
    <Form
      {...formProps}
      title={t('titles:passwordReset')}
      description={t('descriptions:passwordReset')}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={{
        email: '',
      }}
    >
      {() => (
        <Security>
          <Input name="email" type="email" />
          <Box align="right">
            <Button component={Link} to="/login">
              {t('returnToLogin')}
            </Button>
          </Box>
        </Security>
      )}
    </Form>
  );
};

PasswordReset.propTypes = {
  formProps: PropTypes.shape({}),
};

PasswordReset.defaultProps = {
  formProps: null,
};

export default PasswordReset;
