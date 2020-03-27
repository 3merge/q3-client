import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Typography';
import { withCriticalProp } from '../utils';

export default withCriticalProp(({ title, ...rest }) => {
  const { t } = useTranslation('labels');

  return (
    <Grid
      item
      lg={3}
      md={12}
      sm={12}
      xs={12}
      component="div"
      style={{ margin: 0 }}
    >
      <Typography
        component="h3"
        style={{ margin: 0, fontSize: '1em' }}
        {...rest}
      >
        {t(title)}
      </Typography>
    </Grid>
  );
}, 'title');
