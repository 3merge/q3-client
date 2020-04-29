import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { green, red } from '@material-ui/core/colors';
import * as yup from 'yup';
import { useField } from 'formik';
import Field from '../builders/field';
import Form from '../builders/form';
import { handleSubmitWrapper } from './utils';

export const hasLowercase = /([a-z])+/;
export const hasUppercase = /([A-Z])+/;
export const hasNumber = /([0-9])+/;
export const hasSpecialCharacter = /([!@#$%^&*(),.?":{}|<>])+/;

export const hasLength = (v) =>
  typeof v === 'string' && v.length < 17 && v.length > 7;

export const PasswordHelperListItem = ({
  name,
  value,
  re,
}) => {
  const { t } = useTranslation('helpers');
  const passed =
    typeof re === 'function' ? re(value) : re.test(value);

  const getColor = () => (passed ? green[500] : red[500]);
  const getIcon = () => (passed ? <Check /> : <Close />);

  return (
    <ListItem dense style={{ padding: 0, margin: 0 }}>
      <ListItemIcon style={{ color: getColor() }}>
        {getIcon()}
      </ListItemIcon>
      <ListItemText
        primary={t(name)}
        style={{ margin: 0 }}
        primaryTypographyProps={{
          style: { fontSize: '0.877rem' },
        }}
      />
    </ListItem>
  );
};

PasswordHelperListItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  re: PropTypes.oneOfType([
    PropTypes.shape({ test: PropTypes.func }),
    PropTypes.func,
  ]).isRequired,
};

export const PasswordValidationChecklist = () => {
  const { t } = useTranslation('labels');
  const [{ value }] = useField('newPassword');

  return (
    <Box my={1}>
      <List
        subheader={
          <ListSubheader>{t('strength')}</ListSubheader>
        }
      >
        <PasswordHelperListItem
          value={value}
          name="hasLength"
          re={hasLength}
        />
        <PasswordHelperListItem
          value={value}
          name="lowercase"
          re={hasLowercase}
        />
        <PasswordHelperListItem
          value={value}
          name="uppercase"
          re={hasUppercase}
        />
        <PasswordHelperListItem
          value={value}
          name="numbers"
          re={hasNumber}
        />
        <PasswordHelperListItem
          value={value}
          name="special"
          re={hasSpecialCharacter}
        />
      </List>
    </Box>
  );
};

export const PasswordMatch = () => {
  const { t } = useTranslation('labels');
  const [{ value }] = useField('newPassword');
  const [{ value: valueNew }] = useField(
    'confirmNewPassword',
  );

  return (
    <Box my={1}>
      <List
        subheader={
          <ListSubheader>{t('confirmation')}</ListSubheader>
        }
      >
        <PasswordHelperListItem
          value={value}
          name="matches"
          re={() => valueNew === value}
        />
      </List>
    </Box>
  );
};

export const NewPasswordHelpers = () => (
  <>
    <Field
      name="newPassword"
      type="password"
      validate={yup
        .string()
        .min(8)
        .max(16)
        .matches(hasLowercase)
        .matches(hasUppercase)
        .matches(hasNumber)
        .matches(hasSpecialCharacter)
        .required()}
      suppressHelper
      required
    />
    <PasswordValidationChecklist />
    <Field
      name="confirmNewPassword"
      type="password"
      validate={yup
        .string()
        .oneOf([yup.ref('newPassword'), null])
        .required()}
      suppressHelper
      required
    />
    <PasswordMatch />
  </>
);

const PasswordChange = ({
  passwordResetToken,
  email,
  ...rest
}) => (
  <Form
    initialValues={{
      previousPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordResetToken,
      email,
    }}
    {...rest}
  >
    {!passwordResetToken && (
      <Field
        name="previousPassword"
        type="password"
        required
      />
    )}
    <NewPasswordHelpers />
  </Form>
);

PasswordChange.propTypes = {
  passwordResetToken: PropTypes.string,
  email: PropTypes.string,
  onSubmit: PropTypes.func,
};

PasswordChange.defaultProps = {
  passwordResetToken: '',
  email: '',
  onSubmit: handleSubmitWrapper('/password-change', {
    onSuccessStatus: 'passwordChangeSuccess',
    onErrorStatus: 'passwordChangeFail',
  }),
};

export default PasswordChange;
