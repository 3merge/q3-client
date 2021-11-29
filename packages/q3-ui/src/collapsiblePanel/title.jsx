import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withCriticalProp } from '../utils';

export default withCriticalProp(
  ({ title, icon: Icon, ...rest }) => {
    const { t } = useTranslation('labels');

    return (
      <Grid
        item
        lg={2}
        md={3}
        sm={12}
        xs={12}
        style={{ margin: 0 }}
      >
        <Grid container alignItems="center">
          {Icon && (
            <Icon
              {...rest}
              style={{
                fontSize: '100%',
                marginRight: '0.25rem',
              }}
            />
          )}
          <Grid item xs zeroMinWidth>
            <Typography
              component="h3"
              style={{
                fontWeight: 600,
                fontSize: '0.855rem',
              }}
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
