import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withCriticalProp } from '../utils';
import useStyle from './useStyle';

export default withCriticalProp(
  ({ description, ...rest }) => {
    const { t } = useTranslation('descriptions');
    const { iconFont } = useStyle(rest);

    return (
      <Grid item lg={9} md={12} sm={12} xs={12}>
        <Typography
          component="em"
          className={iconFont}
          style={{ margin: 0.5 }}
        >
          {t(description)}
        </Typography>
      </Grid>
    );
  },
  'description',
);
