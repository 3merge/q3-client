import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import NewPasswordHelperText from '../NewPasswordHelperText';

const NewPasswordConfirmation = ({
  newPassword,
  confirmNewPassword,
}) => {
  const { t } = useTranslation('labels');

  return (
    <Grid item xs={12}>
      <List
        subheader={
          <ListSubheader>{t('confirmation')}</ListSubheader>
        }
      >
        <NewPasswordHelperText
          value={newPassword}
          name="matches"
          re={() => confirmNewPassword === newPassword}
        />
      </List>
    </Grid>
  );
};

NewPasswordConfirmation.propTypes = {
  newPassword: PropTypes.string.isRequired,
  confirmNewPassword: PropTypes.string.isRequired,
};

export default NewPasswordConfirmation;
