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
import { get } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { compare, getFirstFromSpec } from './utils';
import useStyle from './styles';

const POSITIVE = '+';
const NEGATIVE = '-';
const INSUFFICENT = 'n/a';

const Statistic = ({
  title,
  previous,
  current,
  unit,
  hideInsufficentData,
  colorMap,
}) => {
  const value = compare(current, previous);
  const { t } = useTranslation('labels');

  const renderInsufficentData = (renderer) =>
    hideInsufficentData ? <Box /> : renderer;

  const Icon = getFirstFromSpec(
    {
      [POSITIVE]: <TrendingUpIcon />,
      [NEGATIVE]: <TrendingDownIcon />,
      [INSUFFICENT]: renderInsufficentData(
        <AllInclusiveIcon />,
      ),
    },
    <TrendingFlatIcon />,
  )(value);

  const color = getFirstFromSpec(
    colorMap,
    get(colorMap, 'n/a'),
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
                {value === 'n/a'
                  ? renderInsufficentData(
                      <span
                        style={{ fontSize: '0.677rem' }}
                      >
                        {t('insufficentData')}
                      </span>,
                    )
                  : value}
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
  hideInsufficentData: false,
  colorMap: {
    [POSITIVE]: 'green',
    [NEGATIVE]: 'red',
    [INSUFFICENT]: 'blue',
  },
};

Statistic.propTypes = {
  current: PropTypes.number,
  title: PropTypes.string.isRequired,
  previous: PropTypes.number,
  unit: PropTypes.string,
  hideInsufficentData: PropTypes.bool,
  colorMap: PropTypes.shape({
    [POSITIVE]: PropTypes.string,
    [NEGATIVE]: PropTypes.string,
    [INSUFFICENT]: PropTypes.string,
  }),
};

export default Statistic;
