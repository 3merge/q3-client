import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { green, red } from '@material-ui/core/colors';
import * as yup from 'yup';
import { Form, Field } from '../builders';
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
  let passed =
    typeof re === 'function' ? re(value) : re.test(value);

  // regardless, it's not valid
  if (!value) passed = false;

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

export const PasswordValidationChecklist = ({
  newPassword: value,
}) => {
  const { t } = useTranslation('labels');

  return (
    <Grid item xs={12}>
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
    </Grid>
  );
};

export const PasswordMatch = ({
  newPassword: value,
  confirmNewPassword: valueNew,
}) => {
  const { t } = useTranslation('labels');

  return (
    <Grid item xs={12}>
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
    </Grid>
  );
};

export const NewPasswordHelpers = (props) => {
  const ref = React.useRef();
  const { newPassword } = props;

  React.useEffect(() => {
    ref.current = newPassword;
  }, [newPassword]);

  return (
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
        xl={12}
        lg={12}
      />
      <PasswordValidationChecklist {...props} />
      <Field
        name="confirmNewPassword"
        type="password"
        listen={['newPassword']}
        validate={yup
          .string()
          .test(
            'matches',
            'This value must match the new password',
            (value) => value === ref.current,
          )}
        suppressHelper
        required
        xl={12}
        lg={12}
      />
      <PasswordMatch {...props} />
    </>
  );
};

const PasswordChange = ({
  passwordResetToken,
  email,
  ...rest
}) => (
  <Form debug {...rest}>
    {(values) => (
      <>
        {!passwordResetToken && (
          <Field
            name="previousPassword"
            type="password"
            required
            xl={12}
            lg={12}
          />
        )}

        <NewPasswordHelpers {...values} />
      </>
    )}
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
