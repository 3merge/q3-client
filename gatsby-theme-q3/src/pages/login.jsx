import React from 'react';
import { Link } from 'gatsby';
import MuiLink from '@material-ui/core/Button';
import { useTranslation } from 'q3-ui-locale';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import FormBox from '../components/FormBox';
import withAuthenticate from '../components/withAuthenticate';

export default withAuthenticate(({ authenticate }) => {
  const { t } = useTranslation();

  return (
    <FormBox
      renderBottom={
        <>
          <Form onSubmit={authenticate}>
            <Field
              name="email"
              type="email"
              required
              xl={12}
              lg={12}
            />
            <Field
              required
              name="password"
              type="password"
              xl={12}
              lg={12}
            />
          </Form>
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
});
