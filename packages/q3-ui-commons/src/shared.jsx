import React from 'react';
import { Link } from '@reach/router';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import Alert from 'q3-ui/alert';
import { useTranslation } from 'react-i18next';
import Input from 'q3-ui/inputs';
import Form from 'q3-ui/form';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Security from './security';

export const emailValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
});

export const FormWithAlert = ({
  handleSubmit,
  redirect,
  sentLabel,
  children,
  ...formProps
}) => {
  const { t } = useTranslation();
  const [hasSent, setHasSent] = React.useState();
  const [init, setInit] = React.useState(false);

  return (
    <Form
      {...formProps}
      readOnly={!init}
      onSubmit={(values, actions) =>
        handleSubmit(values, actions).then(() => {
          setHasSent(true);
        })
      }
    >
      {() => (
        <Security done={setInit}>
          {hasSent && (
            <Alert
              label={t(`labels:${sentLabel}`)}
              type="success"
              done={hasSent}
            />
          )}
          {children}
          <Box align="right">
            <Button component={Link} to={`/${redirect}`}>
              {t(`labels:${redirect}`)}
            </Button>
          </Box>
        </Security>
      )}
    </Form>
  );
};
