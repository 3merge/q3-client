import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import PasswordHelperListItem from '../NewPasswordHelperText';

export const hasLowercase = /([a-z])+/;
export const hasUppercase = /([A-Z])+/;
export const hasNumber = /([0-9])+/;
export const hasSpecialCharacter = /([!@#$%^&*(),.?":{}|<>])+/;

export const hasLength = (v) =>
  typeof v === 'string' && v.length < 17 && v.length > 7;

export const NewPasswordStrengthIndicator = ({
  newPassword,
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
          value={newPassword}
          name="hasLength"
          re={hasLength}
        />
        <PasswordHelperListItem
          value={newPassword}
          name="lowercase"
          re={hasLowercase}
        />
        <PasswordHelperListItem
          value={newPassword}
          name="uppercase"
          re={hasUppercase}
        />
        <PasswordHelperListItem
          value={newPassword}
          name="numbers"
          re={hasNumber}
        />
        <PasswordHelperListItem
          value={newPassword}
          name="special"
          re={hasSpecialCharacter}
        />
      </List>
    </Grid>
  );
};

NewPasswordStrengthIndicator.propTypes = {
  newPassword: PropTypes.string,
};

NewPasswordStrengthIndicator.defaultProps = {
  newPassword: '',
};

export default NewPasswordStrengthIndicator;
