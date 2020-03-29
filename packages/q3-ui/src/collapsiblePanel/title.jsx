import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withCriticalProp } from '../utils';

export default withCriticalProp(
  ({ title, icon: Icon, ...rest }) => {
    const { t } = useTranslation('labels');

    return (
      <Grid
        item
        lg={3}
        md={12}
        sm={12}
        xs={12}
        style={{ margin: 0 }}
      >
        <Grid container spacing={1}>
          {Icon && (
            <Grid item>
              <Icon {...rest} />
            </Grid>
          )}
          <Grid item xs zeroMinWidth>
            <Typography
              component="h3"
              variant="body1"
              style={{ fontWeight: 600 }}
              {...rest}
            >
              {t(title)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  },
  'title',
);
