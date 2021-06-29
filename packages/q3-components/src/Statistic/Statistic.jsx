import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Box,
  ListSubheader,
  Grid,
} from '@material-ui/core';
import {
  TrendingFlat as TrendingFlatIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  AllInclusive as AllInclusiveIcon,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { compare, getFirstFromSpec } from './utils';
import useStyle from './styles';

const Statistic = ({ title, previous, current, unit }) => {
  const value = compare(current, previous);
  const { t } = useTranslation('labels');

  const Icon = getFirstFromSpec(
    {
      '+': <TrendingUpIcon />,
      '-': <TrendingDownIcon />,
      'n/a': <AllInclusiveIcon />,
    },
    <TrendingFlatIcon />,
  )(value);

  const color = getFirstFromSpec(
    {
      '+': 'green',
      '-': 'red',
    },
    'blue',
  )(value);

  const cls = useStyle({
    color,
  });

  return (
    <Grid item xs>
      <Paper variant="rounded">
        <Box px={2} py={1}>
          <Box className={cls.box} whiteSpace="nowrap">
            <ListSubheader
              component="span"
              disableSticky
              disableGutters
              color="primary"
              className={cls.subheader}
            >
              {title}
            </ListSubheader>
            <Box mt={0.25} mb={0.5}>
              <Typography
                variant="h1"
                color="inherit"
                component="span"
              >
                {current || 0}
                <small className={cls.small}>{unit}</small>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box className={cls.icon}>
                <Box className={cls.iconBg} />
                {Icon}
              </Box>
              <small className={cls.small}>
                {value === 'n/a' ? (
                  <span style={{ fontSize: '0.677rem' }}>
                    {t('insufficentData')}
                  </span>
                ) : (
                  value
                )}
              </small>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

Statistic.defaultProps = {
  unit: '',
  previous: 0,
  current: 0,
};

Statistic.propTypes = {
  current: PropTypes.number,
  title: PropTypes.string.isRequired,
  previous: PropTypes.number,
  unit: PropTypes.string,
};

export default Statistic;
