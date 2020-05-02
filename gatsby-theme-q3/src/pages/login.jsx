import React from 'react';
import { Link } from '@reach/router';
import MuiLink from '@material-ui/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { Login as LoginPreset } from 'q3-ui-forms/lib/presets';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormBox from '../components/FormBox';

export default () => {
  const { t } = useTranslation();

  return (
    <FormBox
      renderBottom={
        <>
          <LoginPreset />
          <Box mt={2} mb={1}>
            <Divider />
          </Box>
          <Grid container spacing={1}>
            <MuiLink component={Link} to="/password-reset">
              {t('labels:requestNewPassword')}
            </MuiLink>
            <MuiLink component={Link} to="/reverify">
              {t('labels:reverifyLink')}
            </MuiLink>
          </Grid>
        </>
      }
      renderTop={
        <Typography variant="h1" gutterBottom>
          {t('titles:login')}
        </Typography>
      }
    />
  );
};
