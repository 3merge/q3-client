import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyle from './useStyle';
import withLength from '../withLength';

const FeatureListWithIcons = ({ features }) => {
  const cls = useStyle();
  const isBiggerThanPhone = useMediaQuery(
    '(min-width:600px)',
  );

  return (
    <Grid container spacing={isBiggerThanPhone ? 4 : 2}>
      {features.map(
        ({ title, description, icon: Icon }) => (
          <Grid item md={4} sm={6} xs={12}>
            <Grid container spacing={1}>
              <Grid item className={cls.icon}>
                <Icon />
              </Grid>
              <Grid item className={cls.section}>
                <Typography
                  variant="h3"
                  color="secondary"
                  className={cls.header}
                >
                  {title}
                </Typography>
                <Typography className={cls.body}>
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ),
      )}
    </Grid>
  );
};

FeatureListWithIcons.defaultProps = {
  features: [],
};

FeatureListWithIcons.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.node,
    }),
  ),
};

export default withLength(FeatureListWithIcons, 'features');
