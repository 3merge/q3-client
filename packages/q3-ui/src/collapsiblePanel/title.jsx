import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Typography';
import { withCriticalProp } from '../utils';

export default withCriticalProp(({ title }) => {
  const { t } = useTranslation('labels');

  return (
    <Grid
      item
      lg={3}
      md={12}
      component="div"
      style={{ margin: 0 }}
    >
      <Typography
        variant="subtitle1"
        component="h4"
        style={{ margin: 0 }}
      >
        {t(title)}
      </Typography>
    </Grid>
  );
}, 'title');
