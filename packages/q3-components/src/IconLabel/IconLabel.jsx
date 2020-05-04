import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useStyle from './useStyle';

export const IconLabel = ({
  children,
  label,
  icon: Icon,
}) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');

  return (
    <Box mb={0.5}>
      <Grid container alignItems="center">
        <Grid item>
          <Typography
            variant="overline"
            className={cls.label}
          >
            <Icon className={cls.icon} />
            {t(label)}
          </Typography>
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

IconLabel.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOf([PropTypes.string, PropTypes.node])
    .isRequired,
};

export default IconLabel;
