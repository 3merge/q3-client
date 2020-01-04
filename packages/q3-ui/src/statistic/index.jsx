import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { green, red, blue } from '@material-ui/core/colors';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingFlat from '@material-ui/icons/TrendingFlat';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const isFlat = (v) => !v || v === 0;
const isPositive = (v) => v > 0;

const getColor = (v) => {
  if (isFlat(v)) return blue[500];
  return isPositive(v) ? green[500] : red[500];
};

export const getIcon = (v) => {
  if (isFlat(v)) return TrendingFlat;
  return isPositive(v) ? TrendingUp : TrendingDown;
};

export const Difference = ({ value }) => {
  const Icon = getIcon(value);
  const color = getColor(value);
  return (
    <span style={{ color }}>
      <Icon />
      {value ? `${value}%` : null}
    </span>
  );
};

Difference.propTypes = {
  value: PropTypes.number.isRequired,
};

const Statistic = ({ difference, num, text, to }) => {
  const { t } = useTranslation();

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <Paper>
        <Box
          p={2}
          style={{
            height: 156,
          }}
        >
          <Typography variant="subtitle2" component="p">
            <Typography
              variant="h1"
              component="span"
              style={{ marginRight: '1rem' }}
            >
              {num}
            </Typography>
            <Difference value={difference} />
          </Typography>
          <Typography
            variant="overline"
            style={{
              lineHeight: 1.5,
              display: 'block',
              marginTop: '1rem',
            }}
          >
            {text}
          </Typography>
        </Box>
        <Divider />
        <Box p={1} textAlign="right">
          <Button component={Link} to={to} size="small">
            {t('labels:viewAll')}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

Statistic.propTypes = {
  text: PropTypes.string.isRequired,
  difference: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
  to: PropTypes.string,
};

Statistic.defaultProps = {
  to: '/',
};

export default Statistic;
