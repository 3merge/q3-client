import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withCriticalProp } from '../utils';

export default withCriticalProp(({ description }) => {
  const { t } = useTranslation('descriptions');

  return (
    <Grid item lg={9} md={12}>
      <Typography component="em" style={{ margin: 0.5 }}>
        {t(description)}
      </Typography>
    </Grid>
  );
}, 'description');
